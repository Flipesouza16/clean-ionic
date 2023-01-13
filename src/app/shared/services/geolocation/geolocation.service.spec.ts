import { Position } from '@capacitor/geolocation';
import { GeolocationService } from './geolocation.service'

describe("getCurrentLocalization", () => {
  let service: GeolocationService

  beforeEach(() => {
    service = new GeolocationService()
  })

  it("should have a title title", () => {
    expect(service.title).toEqual('title sim')
  })

  // it("should return a Localization object", async () => {
  //   const geolocationService = new GeolocationService()

  //   const coordinates: Position = {
  //     timestamp: 0,
  //     coords: {
  //       latitude: 150,
  //       longitude: 250,
  //       accuracy: 0,
  //       altitude: 0,
  //       altitudeAccuracy: 0,
  //       heading: 0,
  //       speed: 0
  //     }
  //   }

  //   const newLocalization = geolocationService.createLocalizationFromCoordinates(coordinates);

  //   // Expect the result to be a Localization object
  //   expect(newLocalization.latitude).toEqual('150');
  //   expect(newLocalization.longitude).toEqual('250');
  // });
});
