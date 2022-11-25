import { TestBed } from '@angular/core/testing';

import { MapPointsService } from './map-points.service';

describe('MapPointsService', () => {
  let service: MapPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
