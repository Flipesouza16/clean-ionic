import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationCapacitorService {

  async getCurrentLocalization(): Promise<Position> {
    try {
      const position = await Geolocation.getCurrentPosition();
      return position
    } catch(error) {
      console.error(error)
      throw error
    }
  }
}
