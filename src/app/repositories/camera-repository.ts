import { Photo } from "@capacitor/camera";

export abstract class CameraRepository {
  abstract openCamera(): Promise<Photo>
}
