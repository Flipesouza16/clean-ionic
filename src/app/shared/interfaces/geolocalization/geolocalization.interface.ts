export type PositionCoords = {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitudeAccuracy: number | null | undefined;
  altitude: number | null;
  speed: number | null;
  heading: number | null;
}

export type Localization = {
  longitude: string
  latitude: string
}
