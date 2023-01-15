import { Position } from '@capacitor/geolocation';
import { Localization } from 'src/app/pages/form-item/form-item-create.interface';
import { InMemoryGeolocalizationRepository } from 'src/tests/repositories/in-memory-geolocalization-repository';
import { GeolocalizationService } from './geolocalization.service'

const currentLocalizationMock: Localization = {
  latitude: '150',
  longitude: '250'
}

function initializeGeolocalizationService(): GeolocalizationService {
  const geolocationRepository = new InMemoryGeolocalizationRepository()
  const coords = geolocationRepository.coords

  geolocationRepository.coords = {
    ...coords,
    latitude: +currentLocalizationMock.latitude,
    longitude: +currentLocalizationMock.longitude
  }

  const geolocationService = new GeolocalizationService(geolocationRepository)
  return geolocationService
}

describe("Geolocation Service", () => {
  let geolocationService: GeolocalizationService

  beforeEach(() => {
    geolocationService = initializeGeolocalizationService()
  })

  it("should return a new localization object from coordinates", async () => {
    const coordinates: Position = {
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

    const newLocalization = geolocationService.createLocalizationFromCoordinates(coordinates);

    expect(newLocalization).toBeTruthy();
    expect(newLocalization).toEqual(currentLocalizationMock);
  });

  it("should get current localization", async () => {
    const localization = await geolocationService.getCurrentLocalization();
    expect(localization).toEqual(currentLocalizationMock)
  })
});
