import { Position } from "@capacitor/geolocation";
import { Localization, PositionCoords } from "src/app/shared/interfaces/geolocation/geolocation.interface";

type OverridePositionCoords = Partial<PositionCoords>
type OverrideLocalization = Partial<Localization>

export function makeGeolocationPositionMock(override: OverridePositionCoords = {}): Position {
  return {
    timestamp: 0,
    coords: {
      latitude: generateRandomLatLong().latitude,
      longitude: generateRandomLatLong().longitude,
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      speed: 0,
      ...override
    }
  }
}

function generateRandomLatLong() {
  const latitude = (Math.random() * 180) - 90;
  const longitude = (Math.random() * 360) - 180;

  return { latitude, longitude };
}

export function makeLocalizationMock(override: OverrideLocalization = {}): Localization {
  return {
    latitude: generateRandomLatLong().latitude.toString(),
    longitude: generateRandomLatLong().longitude.toString(),
    ...override
  }
}
