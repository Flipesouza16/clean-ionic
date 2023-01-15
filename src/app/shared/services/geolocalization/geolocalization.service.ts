import { Injectable } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { Localization } from 'src/app/pages/form-item/form-item-create.interface';
import { GeolocalizationRepository } from 'src/app/repositories/geolocalization-repository';

@Injectable({
  providedIn: 'root'
})
export class GeolocalizationService {
  constructor(private geolocationPlugin: GeolocalizationRepository) {}

  async getCurrentLocalization(): Promise<Localization> {
    try {
      const coordinates = await this.geolocationPlugin.getCurrentLocalization()
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
