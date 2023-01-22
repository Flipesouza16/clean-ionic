import { Injectable } from "@angular/core";
import { Photo } from "@capacitor/camera";
import { CameraRepository } from "src/app/repositories/camera-repository";
import { makePhotoMock } from "../factories/camera-factory";

@Injectable({
  providedIn: 'root'
})
export class InMemoryCameraRepository implements CameraRepository {
  private _photo: Photo = makePhotoMock()

  public setPhotoPath(path: string) {
    this._photo.path = path
  }

  public async openCamera(): Promise<Photo> {
    return this._photo
  }
}
