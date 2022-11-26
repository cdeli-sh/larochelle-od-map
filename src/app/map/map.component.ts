import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Vector from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Style, Circle, Stroke, Fill, Text } from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { ParkingService, Point as PointType } from '../parking.service';
import VectorSource from 'ol/source/Vector';
import * as ol from 'ol';
import { MapPointsService } from '../map-points.service';
import { CycleService } from '../cycle.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})

export class MapComponent implements OnInit, OnChanges {

  map?: Map;

  types: any = {
    parking: false,
    cycle: false
  }

  markers: any = {
    parkingLayer: new VectorLayer({
      source: new VectorSource,
      style: (feature) => {
        return [
          new Style({
            image: new Circle({
              radius: 10,
              stroke: new Stroke({ color: '#fff' }),
              fill: new Fill({ color: '#3399CC' }),
            }),
            stroke: new Stroke({
              color: [0, 0, 0, 1.0],
              width: 1,
              lineDash: [1, 5, 3, 5]
            }),
            text: new Text({
              font: '12px Calibri',
              text: feature.get('available'),
              placement: 'line',
              fill: new Fill({
                color: '#000'
              }),
              stroke: new Stroke({
                color: '#fff',
                width: 3
              })
            }),
          })
        ];
      }
    }),
    cyclesLayer: new VectorLayer({
      source: new VectorSource,
      style: (feature) => {
        return [
          new Style({
            image: new Circle({
              radius: 10,
              stroke: new Stroke({ color: '#fff' }),
              fill: new Fill({ color: '#c8c450' }),
            }),
            stroke: new Stroke({
              color: [0, 0, 0, 1.0],
              width: 1,
              lineDash: [1, 5, 3, 5]
            }),
            text: new Text({
              font: '12px Calibri',
              text: feature.get('available'),
              placement: 'line',
              fill: new Fill({
                color: '#000'
              }),
              stroke: new Stroke({
                color: '#fff',
                width: 3
              })
            }),
          })
        ];
      }
    }),
  };

  constructor(private mapPointsService: MapPointsService, private parkingService: ParkingService, private cycleService: CycleService) {
    this.mapPointsService.typesChange.subscribe(value => {
      this.types = value
      this.reloadMarkers()
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.initMap()
    this.types = this.mapPointsService.types;
  }

  reloadMarkers(): void {
    this.markers.parkingLayer.getSource()?.clear();
    this.markers.cyclesLayer.getSource()?.clear();
    this.loadSites();
  }

  initMap(): void {
    this.loadSites();
    this.map = new Map({
      view: new View({
        center: fromLonLat([-1.1504699, 46.1580082]),
        zoom: 14,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'ol-map'
    });
    this.map.addLayer(this.markers.parkingLayer);
    this.map.addLayer(this.markers.cyclesLayer);
  }

  loadSites(): void {
    let points: any = [];
    console.log(points)
    if (this.types.parking) {
      this.parkingService.getParkings().subscribe(points => {
        points.map((p: any) => {
          let feat = new Feature({
            geometry: new Point(fromLonLat([p.lng, p.lat])),
            name: p.name,
            available: p.available
          });
          this.markers.parkingLayer.getSource()?.addFeature(feat);
        })
      })
    }

    if (this.types.cycle) {
      this.cycleService.getParkings().subscribe(points => {
        points.map((p: any) => {
          let feat = new Feature({
            geometry: new Point(fromLonLat([p.lng, p.lat])),
            name: p.name,
            available: p.available
          });
          this.markers.cyclesLayer.getSource()?.addFeature(feat);
        })
      })
    }
  }
}
