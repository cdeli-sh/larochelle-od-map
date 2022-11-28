import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CycleService {

  private apiUrl = "https://services-api.molecul.fr/api/lr-cycles"

  constructor(
    private http: HttpClient
  ) {
  }

  getParkings(): Observable<Point[]> {
    let req = this.http.get<Res>(this.apiUrl).pipe(
      map(res => {
        console.log(res)
        return res.records.map<Point>(p => ({ lng: Number(p.fields.station_longitude), lat: Number(p.fields.station_latitude), name: p.fields.station_nom, available: p.fields.velos_disponibles }))
      })
    )
    return req
  }
}

interface Res {
  records: [{
    datasetid: string;
    fields: {
      station_longitude: string;
      station_latitude: string;
      station_nom: string;
      nombre_emplacements: string;
      velos_disponibles: string;
      accroches_libres: string;
    }
  }]
}

export interface Point {
  lng: number;
  lat: number;
  name: string;
  available: string;
}[]
