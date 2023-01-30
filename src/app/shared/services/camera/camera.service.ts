import { Injectable } from '@angular/core';
import { Photo } from '@capacitor/camera';
import { CameraRepository } from 'src/app/repositories/camera-repository';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private cameraRepository: CameraRepository) { }

  async openCamera(): Promise<Photo> {
    try {
      const photo = await this.cameraRepository.openCamera()
      return photo
    } catch(error) {
      console.error(error)
      throw error
    }
  }
}
