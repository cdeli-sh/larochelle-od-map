import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Vector from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Style, Circle, Stroke, Fill } from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Point as PointType } from '../parking.service';
import VectorSource from 'ol/source/Vector';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})

export class MapComponent implements OnInit, OnChanges {

  map?: Map;

  markers: VectorLayer<Vector> = new VectorLayer({
    source: new VectorSource,
  });

  @Input() points: PointType[] = [];

  ngOnInit(): void {
    this.initMap()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.markers.getSource()?.clear();
    this.loadSites();
    console.log(this.markers.getSource()?.getFeatures())
  }

  initMap(): void {
    this.loadSites();
    this.map = new Map({
      view: new View({
        center: fromLonLat([-1.1504699, 46.1580082]),
        zoom: 13,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'ol-map'
    });
    this.map.addLayer(this.markers);

    var marker = new Feature(new Point(fromLonLat([2.2931, 48.8584])));
    this.markers.getSource()?.addFeature(marker);
  }

  loadSites(): void {
    console.log(this.points)
    this.points.map((p) => {
      let feat = new Feature({
        geometry: new Point(fromLonLat([p.lng, p.lat])),
        name: p.name,
        style: new Style({
          image: new Circle({
            radius: 10,
            stroke: new Stroke({ color: '#fff' }),
            fill: new Fill({ color: '#3399CC' }),
          })
        })
      });
      this.markers.getSource()?.addFeature(feat);
    })
  }
}
