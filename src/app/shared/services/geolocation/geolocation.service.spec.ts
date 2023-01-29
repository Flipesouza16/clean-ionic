import { makeGeolocationPositionMock, makeLocalizationMock } from 'src/tests/factories/geolocation-factory';
import { InMemoryGeolocationRepository } from 'src/tests/repositories/in-memory-geolocation-repository';
import { GeolocationService } from './geolocation.service'

const currentLocalizationMock = makeLocalizationMock({
  latitude: '255',
  longitude: '350'
})

function initializeServiceWithLocalizationMock(): GeolocationService {
  const geolocationRepository = new InMemoryGeolocationRepository()
  geolocationRepository.setLocalizationMockToCoords(currentLocalizationMock)

  const geolocationService = new GeolocationService(geolocationRepository)
  return geolocationService
}

describe("Geolocation Service", () => {
  let geolocationService: GeolocationService

  beforeEach(() => {
    geolocationService = initializeServiceWithLocalizationMock()
  })

  it("should return a new localization object from coordinates", async () => {
    const positionCoordinates = makeGeolocationPositionMock({
      latitude: Number(currentLocalizationMock.latitude),
      longitude: Number(currentLocalizationMock.longitude),
    });

    const newLocalization = geolocationService.createLocalizationFromCoordinates(positionCoordinates);

    expect(newLocalization).toBeTruthy();
    expect(newLocalization).toEqual(currentLocalizationMock);
  });

  it("should get current localization", async () => {
    const localization = await geolocationService.getCurrentLocalization();
    expect(localization).toEqual(currentLocalizationMock)
  })
});
