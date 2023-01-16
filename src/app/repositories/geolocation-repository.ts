import { Position } from "@capacitor/geolocation";

export abstract class GeolocationRepository {
  abstract getCurrentLocalization(): Promise<Position>
}
