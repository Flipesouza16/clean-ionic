import { Injectable } from "@angular/core";
import { Position } from "@capacitor/geolocation";
import { GeolocalizationRepository } from "src/app/repositories/geolocalization-repository";
import { Localization } from "src/app/shared/interfaces/geolocalization/geolocalization.interface";
import { makeGeolocalizationPositionMock } from "../factories/geolocalization-factory";

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
  private _position = makeGeolocalizationPositionMock()

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
