import { Photo } from "@capacitor/camera";

type OverridePhoto = Partial<Photo>

export function makePhotoMock(override: OverridePhoto = {}): Photo {
  return {
    format: "jpeg",
    path: "file:///storage/emulated/0/Android/.jpg",
    saved: false,
    webPath: "_capacitor_file_/storage/emulated/0/Android/data/io.ionic",
    ...override
  }
}
