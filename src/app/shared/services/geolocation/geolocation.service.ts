import { Injectable } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { GeolocationRepository } from 'src/app/repositories/geolocation-repository';
import { Localization } from '../../interfaces/geolocation/geolocation.interface';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor(private geolocationPlugin: GeolocationRepository) {}

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
