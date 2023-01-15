import { Position } from "@capacitor/geolocation";

export abstract class GeolocalizationRepository {
  abstract getCurrentLocalization(): Promise<Position>
}
