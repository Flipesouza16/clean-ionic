import { FormItemPage } from "./form-item.page"
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { GeolocationService } from "src/app/shared/services/geolocation/geolocation.service";
import { CameraService } from "src/app/shared/services/camera/camera.service";
import { InMemoryGeolocationRepository } from "src/tests/repositories/in-memory-geolocation-repository";
import { InMemoryCameraRepository } from "src/tests/repositories/in-memory-camera-repository";
import { makeLocalizationMock } from "src/tests/factories/geolocation-factory";

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormItemPageModule } from "./form-item.module";
import { makePhotoMock } from "src/tests/factories/camera-factory";

describe('form-item.page', () => {
  let formItemPage: FormItemPage
  let fixture: ComponentFixture<FormItemPage>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormItemPageModule,
      ],
      providers: [
        {
          provide: GeolocationService,
          useClass: InMemoryGeolocationRepository
        },
        {
          provide: CameraService,
          useClass: InMemoryCameraRepository
        },
        {
          provide: LocationStrategy,
          useClass: PathLocationStrategy
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(FormItemPage)
    formItemPage = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should instance form item page', async () => {
    expect(formItemPage).toBeTruthy()
  })

  it('should call location.back() when backToPreviousPage() is called', () => {
    const spy = jest.spyOn(formItemPage.location, 'back')
    formItemPage.backToPreviousPage();
    expect(spy).toHaveBeenCalled();
  });

  it('should call geolocalizationService.getCurrentLocalization() when getCurrentLocalization() is called', async () => {
    const spy = jest.spyOn(formItemPage.geolocationService, 'getCurrentLocalization')
    await formItemPage.getCurrentLocalization()
    expect(spy).toHaveBeenCalled()
  });

  it('should call updateLocalizationFromCurrent() when getCurrentLocalization() is called', async () => {
    const spy = jest.spyOn(formItemPage, 'updateLocalizationFromCurrent')
    await formItemPage.getCurrentLocalization()
    expect(spy).toHaveBeenCalled()
  });

  it('should set isLocalizationFilled to true when updateLocalizationFromCurrent() is called', async () => {
    const localization = makeLocalizationMock()
    formItemPage.updateLocalizationFromCurrent(localization)
    expect(formItemPage.isLocalizationFilled).toBeTruthy()
  });

  it('should update localization when updateLocalizationFromCurrent() is called', () => {
    const localization = makeLocalizationMock()
    formItemPage.updateLocalizationFromCurrent(localization)
    expect(formItemPage.localization).toEqual(localization)
  });

  it('should call setReactiveFormLocalization() when updateLocalizationFromCurrent() is called', () => {
    const spy = jest.spyOn(formItemPage, 'setReactiveFormLocalization')
    const localization = makeLocalizationMock()
    formItemPage.updateLocalizationFromCurrent(localization)
    expect(spy).toHaveBeenCalled()
  });

  it('should update form controls localization', () => {
    const localization = makeLocalizationMock()
    formItemPage.setReactiveFormLocalization(localization)
    expect(formItemPage.form.controls.localizationLatitude.value).toEqual(localization.latitude)
    expect(formItemPage.form.controls.localizationLongitude.value).toEqual(localization.longitude)
  });

  it('should check if localization from form controls is valid when updateLocalizationFromFormControls() is called', () => {
    const spy = jest.spyOn(formItemPage, 'createLocalizationFromFormControls')
    formItemPage.updateLocalizationFromFormControls(formItemPage.form)

    expect(spy).not.toHaveBeenCalled()
  });

  it('should call createLocalizationFromFormControls() when updateLocalizationFromFormControls() is called', () => {
    const localization = makeLocalizationMock()
    formItemPage.setReactiveFormLocalization(localization)

    const spy = jest.spyOn(formItemPage, 'createLocalizationFromFormControls')
    formItemPage.updateLocalizationFromFormControls(formItemPage.form)

    expect(spy).toHaveBeenCalled()
  });

  it('should update localization from form controls localization', () => {
    const localization = makeLocalizationMock()
    formItemPage.setReactiveFormLocalization(localization)
    formItemPage.updateLocalizationFromFormControls(formItemPage.form)

    expect(formItemPage.localization).toEqual(localization)
  });

  it('should set isLocalizationFilled to true when updateLocalizationFromFormControls() is called', () => {
    const localization = makeLocalizationMock()
    formItemPage.setReactiveFormLocalization(localization)
    formItemPage.updateLocalizationFromFormControls(formItemPage.form)

    expect(formItemPage.isLocalizationFilled).toBeTruthy()
  });

  it('should return localization when createLocalizationFromFormControls() is called', () => {
    const localization = makeLocalizationMock()
    formItemPage.setReactiveFormLocalization(localization)
    formItemPage.updateLocalizationFromFormControls(formItemPage.form)

    const localizationFromFormControls = formItemPage.createLocalizationFromFormControls(formItemPage.form)

    expect(localizationFromFormControls).toEqual(localization)
  });

  // *******************  Camera  ********************
  it('should get photo after open camera', async () => {
    const photoMock = makePhotoMock()
    const capturedPhoto = await formItemPage.getPhoto()
    expect(capturedPhoto).toEqual(photoMock)
  });

  it('should call getPhoto() when captureAndSetPhoto() is called', async () => {
    const spy = jest.spyOn(formItemPage, 'getPhoto')
    await formItemPage.captureAndSetPhoto()

    expect(spy).toHaveBeenCalled()
  });

  it('should update photo if image.path is valid', () => {
    const photoMock = makePhotoMock()
    formItemPage.updatePhoto(photoMock)

    expect(formItemPage.photo).toBeTruthy()
  })

  it('should call updatePhoto() when captureAndSetPhoto() is called', async () => {
    const spy = jest.spyOn(formItemPage, 'updatePhoto')
    await formItemPage.captureAndSetPhoto()

    expect(spy).toHaveBeenCalled()
  });
})
