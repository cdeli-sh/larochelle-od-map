import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ParkingService {

  private apiUrl = 'https://api.agglo-larochelle.fr/production/opendata/api/records/1.0/search/dataset=parking___places_disponibles_en_temps_reel&sort=-xlong&facet=id&facet=xlong&facet=ylat&facet=nom';

  constructor(
    private http: HttpClient
  ) { }

  getParkings(): Observable<Point[]> {
    let req = this.http.get<Res>(this.apiUrl).pipe(
      map(res => {
        return res.records.map<Point>(p => ({ lng: Number(p.fields.xlong), lat: Number(p.fields.ylat), name: p.fields.nom }))
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
    }
  }]
}

export interface Point {
  lng: number;
  lat: number;
  name: string;
}[]

