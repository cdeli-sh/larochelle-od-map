import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MapPointsService } from '../map-points.service';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.sass']
})

export class SettingsMenuComponent implements OnInit, OnChanges {
  public settings = {
    parking: false,
    cycle: false
  }

  constructor(public mapPointService: MapPointsService) { }

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  updateSettings() {
    this.mapPointService.updateTypes(this.settings)
  }

  @Input() parking: boolean = false;

  ngOnInit(): void {
  }
}
