import { Component, OnInit } from '@angular/core';
import { MapPointsService } from '../map-points.service';
import { ParkingService, Point } from '../parking.service'

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.sass']
})
export class MapContainerComponent implements OnInit {
  points: Point[] = [];

  constructor(private mapPointService: MapPointsService, private parkingService: ParkingService) { }

  ngOnInit(): void {
    this.getParkingPoints()
  }

  getParkingPoints(): void {
    this.parkingService.getParkings().subscribe(r => {
      this.points = r
      console.log(this.points)
    });
  }
}
