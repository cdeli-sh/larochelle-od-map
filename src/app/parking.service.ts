import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ParkingService {

  private apiUrl = 'https://services-api.molecul.fr/api/lr-parkings';

  constructor(
    private http: HttpClient
  ) { }

  getParkings(): Observable<Point[]> {
    let req = this.http.get<Res>(this.apiUrl).pipe(
      map(res => {
        console.log(res)
        return res.records.map<Point>(p => ({ lng: Number(p.fields.xlong), lat: Number(p.fields.ylat), name: p.fields.nom, available: p.fields.nb_places_disponibles }))
      })
    )
    return req
  }
}

interface Res {
  records: [{
    datasetid: string;
    fields: {
      xlong: string;
      ylat: string;
      nom: string;
      id: string;
      nb_places_disponibles: string;
    }
  }]
}

export interface Point {
  lng: number;
  lat: number;
  name: string;
  available: string;
}[]

