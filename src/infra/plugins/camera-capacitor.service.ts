import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { CameraRepository } from 'src/app/repositories/camera-repository';

@Injectable({
  providedIn: 'root'
})
export class CameraCapacitorService implements CameraRepository {

  async openCamera(): Promise<Photo> {
    const photo = await Camera.getPhoto({
      quality: 90,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri
    })

    return photo
  }
}
