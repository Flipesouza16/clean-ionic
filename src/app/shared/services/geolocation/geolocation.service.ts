import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Localization } from 'src/app/pages/form-item/form-item-create.interface';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  async getCurrentLocalization(): Promise<Localization> {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const newLocalization: Localization = this.createLocalizationFromCoordinates(coordinates)
      return newLocalization
    } catch(error) {
      console.error(error)
      throw error
    }
  }

  createLocalizationFromCoordinates(coordinates: Position): Localization {
    return {
      latitude: coordinates.coords.latitude.toString(),
      longitude: coordinates.coords.longitude.toString(),
    }
  }
}
