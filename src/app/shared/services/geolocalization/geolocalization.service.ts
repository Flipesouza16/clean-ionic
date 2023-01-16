import { Injectable } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { GeolocalizationRepository } from 'src/app/repositories/geolocalization-repository';
import { Localization } from '../../interfaces/geolocalization/geolocalization.interface';

@Injectable({
  providedIn: 'root'
})
export class GeolocalizationService {
  constructor(private geolocationPlugin: GeolocalizationRepository) {}

  createLocalizationFromCoordinates({ coords: coordinates }: Position): Localization {
    return {
      latitude: coordinates.latitude.toString(),
      longitude: coordinates.longitude.toString(),
    }
  }

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
}
