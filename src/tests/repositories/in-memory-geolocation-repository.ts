import { Injectable } from "@angular/core";
import { Position } from "@capacitor/geolocation";
import { GeolocationRepository } from "src/app/repositories/geolocation-repository";
import { Localization } from "src/app/shared/interfaces/geolocation/geolocation.interface";
import { makeGeolocationPositionMock } from "../factories/geolocation-factory";

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
export class InMemoryGeolocationRepository implements GeolocationRepository {
  private _position = makeGeolocationPositionMock()

  async getCurrentLocalization(): Promise<Position> {
    return this._position;
  }

  public set coords(coords: PositionCoords) {
    this._position.coords = coords
  }

  public get coords(): PositionCoords {
    return this._position.coords
  }

  public setLocalizationMockToCoords(localizationMock: Localization): void {
    this._position.coords = {
      ...this._position.coords,
      latitude: +localizationMock.latitude,
      longitude: +localizationMock.longitude
    }
  }
}
