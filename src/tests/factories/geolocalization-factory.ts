import { Position } from "@capacitor/geolocation";
import { Localization, PositionCoords } from "src/app/shared/interfaces/geolocalization/geolocalization.interface";

type OverridePositionCoords = Partial<PositionCoords>
type OverrideLocalization = Partial<Localization>

export function makeGeolocalizationPositionMock(override: OverridePositionCoords = {}): Position {
  return {
    timestamp: 0,
    coords: {
      latitude: 150,
      longitude: 250,
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      speed: 0,
      ...override
    }
  }
}

export function makeLocalizationMock(override: OverrideLocalization = {}): Localization {
  return {
    latitude: '150',
    longitude: '250',
    ...override
  }
}
