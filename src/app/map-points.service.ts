import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ParkingService } from './parking.service';

@Injectable({
  providedIn: 'root'
})

export class MapPointsService {
  public types = {
    parking: false,
    cycle: false
  };

  public typesChange: Subject<any> = new Subject<any>();

  constructor() {
    this.typesChange.subscribe(v => this.types = v)
  }

  updateTypes(v: any) {
    this.typesChange.next(v);
  }
}
