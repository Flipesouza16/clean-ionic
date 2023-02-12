import { FormItemPage } from "./form-item.page"
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { GeolocationService } from "src/app/shared/services/geolocation/geolocation.service";
import { CameraService } from "src/app/shared/services/camera/camera.service";
import { InMemoryGeolocationRepository } from "src/tests/repositories/in-memory-geolocation-repository";
import { InMemoryCameraRepository } from "src/tests/repositories/in-memory-camera-repository";
import { makeLocalizationMock } from "src/tests/factories/geolocation-factory";
import { Capacitor } from '@capacitor/core';

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormItemPageModule } from "./form-item.module";
import { makePhotoMock } from "src/tests/factories/camera-factory";
import { StorageService } from "src/app/shared/services/storage/storage.service";
import { InMemoryStorageRepository } from "src/tests/repositories/in-memory-storage-repository";

describe('form-item.page', () => {
  let formItemPage: FormItemPage
  let fixture: ComponentFixture<FormItemPage>
  let storageService: StorageService

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
          provide: StorageService,
          useClass: InMemoryStorageRepository
        },
        {
          provide: LocationStrategy,
          useClass: PathLocationStrategy
        },
      ]
    }).compileComponents()

    storageService = TestBed.inject(StorageService)
    fixture = TestBed.createComponent(FormItemPage)
    formItemPage = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should instance form item page', async () => {
    expect(formItemPage).toBeTruthy()
  })

  // *******************  Geolocalization  ********************
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

  it('should call updatePhotoMobile() if plataforma is not web', async () => {
    const spy = jest.spyOn(formItemPage, 'updatePhotoMobile')
    formItemPage.plataforma = 'android'

    const photoMock = makePhotoMock()

    formItemPage.updatePhoto(photoMock)

    expect(spy).toHaveBeenCalled()
  });

  it('should call updatePhotoWeb() if plataforma not web', async () => {
    const spy = jest.spyOn(formItemPage, 'updatePhotoWeb')
    formItemPage.plataforma = 'web'

    const photoMock = makePhotoMock()

    formItemPage.updatePhoto(photoMock)

    expect(spy).toHaveBeenCalled()
  });

  it('should update photo from form when updatePhotoMobile() is called', async () => {
    const photoMock = makePhotoMock()

    formItemPage.updatePhotoMobile(photoMock)

    expect(formItemPage.form.controls['image']).toBeTruthy()
  });

  it('should call Capacitor.convertFileSrc() when updatePhotoMobile is called', async () => {
    const spyConvertFile = jest.spyOn(Capacitor, 'convertFileSrc')

    const photoMock = makePhotoMock()

    formItemPage.updatePhotoMobile(photoMock)

    expect(spyConvertFile).toHaveBeenCalled()
  });

  it('should update photo from form when updatePhotoWeb() is called', async () => {
    const photoMock = makePhotoMock()

    formItemPage.updatePhotoWeb(photoMock)

    expect(formItemPage.form.controls['image']).toBeTruthy()
  });

  it('should call Capacitor.convertFileSrc() when updatePhotoWeb is called', async () => {
    const spyConvertFile = jest.spyOn(Capacitor, 'convertFileSrc')

    const photoMock = makePhotoMock()

    formItemPage.updatePhotoWeb(photoMock)

    expect(spyConvertFile).toHaveBeenCalled()
  });

  // ************** toast ****************
  it('should create and open toast when openToast() is called', async () => {
    const message = 'hello world'
    const toast: any = { present: jest.fn() };

    jest.spyOn(formItemPage.toastCtrl, 'create').mockResolvedValue(toast)
    const spy = jest.spyOn(toast, 'present')

    await formItemPage.openToast(message)
    expect(spy).toHaveBeenCalled()
  })

  // ************** Check fields ****************
  it('should return true after check if field name is valid', () => {
    formItemPage.form.controls.name.setValue('myName')
    const isNameValid = formItemPage.isFieldValid('name')
    expect(isNameValid).toBeTruthy()
  })

  it('should return false if there is no invalid field after check all fields', () => {
    const localization = makeLocalizationMock()
    formItemPage.setReactiveFormLocalization(localization)
    formItemPage.form.controls.image.setValue('image/mock')
    formItemPage.form.controls.name.setValue('myName')

    const isSomeInvalidField = formItemPage.checkIfHaveSomeInvalidField()

    expect(isSomeInvalidField).toBeFalsy()
  })

  it('should get formatted property from form controls', () => {
    const formattedValues = formItemPage.getFormattedValuesFromFormControls()

    const hasPropertyImage = formattedValues.hasOwnProperty('image')
    const hasPropertyLocalizationLatitude = formattedValues.hasOwnProperty('localizationLatitude')
    const hasPropertyLocalizationLongitude = formattedValues.hasOwnProperty('localizationLongitude')
    const hasPropertyName = formattedValues.hasOwnProperty('name')

    expect(hasPropertyImage).toBeTruthy()
    expect(hasPropertyLocalizationLatitude).toBeTruthy()
    expect(hasPropertyLocalizationLongitude).toBeTruthy()
    expect(hasPropertyName).toBeTruthy()
  })

  it('should get formatted values from form controls', () => {
    const localization = makeLocalizationMock()
    formItemPage.setReactiveFormLocalization(localization)
    formItemPage.form.controls.image.setValue('image/mock')
    formItemPage.form.controls.name.setValue('myName')

    const formattedValues = formItemPage.getFormattedValuesFromFormControls()

    expect(formattedValues.image).toBeTruthy()
    expect(formattedValues.localizationLatitude).toBeTruthy()
    expect(formattedValues.localizationLongitude).toBeTruthy()
    expect(formattedValues.name).toBeTruthy()
  })

  it('should no call the getFormattedValuesFromFormControls() method when call saveItem() if there is some invalid field', async () => {
    formItemPage.form.controls.name.setValue(null)
    const spy = jest.spyOn(formItemPage, 'getFormattedValuesFromFormControls')

    await formItemPage.saveItem()
    expect(spy).not.toHaveBeenCalled()
  })

  it('should call the getFormattedValuesFromFormControls() method when call saveItem() if all the values are valid', async () => {
    const localization = makeLocalizationMock()
    formItemPage.setReactiveFormLocalization(localization)
    formItemPage.form.controls.image.setValue('image/mock')
    formItemPage.form.controls.name.setValue('myName')

    const spy = jest.spyOn(formItemPage, 'getFormattedValuesFromFormControls')

    await formItemPage.saveItem()
    expect(spy).toHaveBeenCalled()
  })

  it('should call storageService.setValue() method when call saveItem() if all the values are valid', async () => {
    const localization = makeLocalizationMock()
    formItemPage.setReactiveFormLocalization(localization)
    formItemPage.form.controls.image.setValue('image/mock')
    formItemPage.form.controls.name.setValue('myName')

    const formattedValue = formItemPage.getFormattedValuesFromFormControls()

    const spy = jest.spyOn(storageService, 'setValue')

    await formItemPage.saveItem()
    expect(spy).toHaveBeenCalledWith({
      key: 'list-items',
      value: JSON.stringify(formattedValue)
    })
  })
})
