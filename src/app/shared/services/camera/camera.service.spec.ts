import { InMemoryCameraRepository } from 'src/tests/repositories/in-memory-camera-repository';
import { CameraService } from './camera.service';

const photoPathMock = 'file:///path/test'

function initializeCameraServiceWithCustomPath(): CameraService {
  const cameraRepository = new InMemoryCameraRepository()
  cameraRepository.setPhotoPath(photoPathMock)

  const cameraService = new CameraService(cameraRepository)
  return cameraService
}

describe('CameraService', () => {
  let cameraService: CameraService;

  beforeEach(() => {
    cameraService = initializeCameraServiceWithCustomPath()
  });

  it('should open camera and get photo', () => {
    const photo = cameraService.openCamera()
    expect(photo).toBeTruthy()
  });

  it('should get the correct photo path', async () => {
    const photo = await cameraService.openCamera()
    expect(photo.path).toEqual(photoPathMock)
  })
});
