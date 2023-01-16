import { makeGeolocalizationPositionMock, makeLocalizationMock } from 'src/tests/factories/geolocalization-factory';
import { InMemoryGeolocalizationRepository } from 'src/tests/repositories/in-memory-geolocalization-repository';
import { GeolocalizationService } from './geolocalization.service'

const currentLocalizationMock = makeLocalizationMock()

function initializeServiceWithLocalizationMock(): GeolocalizationService {
  const geolocalizationRepository = new InMemoryGeolocalizationRepository()
  geolocalizationRepository.setLocalizationMockToCoords(currentLocalizationMock)

  const geolocationService = new GeolocalizationService(geolocalizationRepository)
  return geolocationService
}

describe("Geolocation Service", () => {
  let geolocationService: GeolocalizationService

  beforeEach(() => {
    geolocationService = initializeServiceWithLocalizationMock()
  })

  it("should return a new localization object from coordinates", async () => {
    const positionCoordinates = makeGeolocalizationPositionMock()
    const newLocalization = geolocationService.createLocalizationFromCoordinates(positionCoordinates);

    expect(newLocalization).toBeTruthy();
    expect(newLocalization).toEqual(currentLocalizationMock);
  });

  it("should get current localization", async () => {
    const localization = await geolocationService.getCurrentLocalization();
    expect(localization).toEqual(currentLocalizationMock)
  })
});
