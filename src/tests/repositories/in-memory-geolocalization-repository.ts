import { Injectable } from "@angular/core";
import { Position } from "@capacitor/geolocation";
import { GeolocalizationRepository } from "src/app/repositories/geolocalization-repository";

type PositionCoords = {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitudeAccuracy: number | null | undefined;
  altitude: number | null;
  speed: number | null;
  heading: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class InMemoryGeolocalizationRepository implements GeolocalizationRepository {
  private _position: Position = {
    timestamp: 0,
    coords: {
      latitude: 150,
      longitude: 250,
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      speed: 0
    }
  }

  async getCurrentLocalization(): Promise<Position> {
    return this._position;
  }

  public set coords(coords: PositionCoords) {
    this._position.coords = coords
  }

  public get coords(): PositionCoords {
    return this._position.coords
  }
}

