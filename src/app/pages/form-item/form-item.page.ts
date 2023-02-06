import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormItemCreate } from './form-item-create.interface';
import { GeolocationService } from 'src/app/shared/services/geolocation/geolocation.service';
import { Localization } from 'src/app/shared/interfaces/geolocation/geolocation.interface';
import { Capacitor } from '@capacitor/core';
import { CameraService } from 'src/app/shared/services/camera/camera.service';
import { Photo } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';

const ListFields = ['name', 'image', 'localizationLongitude', 'localizationLatitude'] as const
type AllFiedls = typeof ListFields[number]

type FormattedValueFromFormControls = {
  [key in AllFiedls]: string
}

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.page.html',
  styleUrls: ['./form-item.page.scss'],
})
export class FormItemPage {
  public form: FormGroup<ReactiveFormItemCreate>;
  public localization: Localization = {
    longitude: '',
    latitude: ''
  };
  public isLocalizationFilled = false
  public photo = ''

  constructor(
    private platform: Platform,
    public location: Location,
    private formBuilder: FormBuilder,
    public geolocationService: GeolocationService,
    public cameraService: CameraService,
    public toastCtrl: ToastController
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.backToPreviousPage();
    });

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      localizationLongitude: ['' , Validators.required],
      localizationLatitude: ['' , Validators.required],
      image: ['', Validators.required],
    });

    this.updateLocalizationFromFormControls(this.form)
  }

  backToPreviousPage(): void {
    this.location.back();
  }

  updateLocalizationFromFormControls(form: FormGroup<ReactiveFormItemCreate>): void {
    if (form.controls.localizationLatitude.value && form.controls.localizationLongitude.value) {
      const localization = this.createLocalizationFromFormControls(form);
      this.localization = localization;
      this.isLocalizationFilled = true;
    }
  }

  createLocalizationFromFormControls({ controls }: FormGroup<ReactiveFormItemCreate>): Localization {
    return {
      latitude: controls.localizationLatitude.value!.toString(),
      longitude: controls.localizationLongitude.value!.toString(),
    };
  }

  setReactiveFormLocalization(localization: Localization): void {
    this.form.controls.localizationLatitude.setValue(localization.latitude)
    this.form.controls.localizationLongitude.setValue(localization.longitude)
  }

  async getCurrentLocalization(): Promise<void> {
    const currentLocalization = await this.geolocationService.getCurrentLocalization()

    if(currentLocalization) {
      this.updateLocalizationFromCurrent(currentLocalization)
    }
  }

  updateLocalizationFromCurrent(currentLocalization: Localization): void {
    this.isLocalizationFilled = true
    this.localization = currentLocalization;
    this.setReactiveFormLocalization(currentLocalization);
  }

  async captureAndSetPhoto(): Promise<void> {
    const photo = await this.getPhoto()

    if(photo.path) {
      this.updatePhoto(photo)
    }
  }

  async getPhoto(): Promise<Photo> {
    const photo = await this.cameraService.openCamera()
    return photo
  }

  updatePhoto(image: Photo): void {
    if(image.path) {
      this.photo = Capacitor.convertFileSrc(image.path)
      this.form.controls['image'].setValue(this.photo)
    }
  }

  checkIfHaveSomeInvalidField(): boolean {
    const invalidField = ListFields.find(field => !this.isFieldValid(field))

    if(invalidField) {
      this.openToast(`Field ${invalidField} invalid`)
    }

    return !!invalidField
  }

  /* ACIMA TUDO TESTADO */

  // TESTADO
  async openToast(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    })

    toast.present()
  }

  isFieldValid(field: AllFiedls): boolean {
    return !!this.form.get(field)?.valid
  }

  async saveItem(): Promise<void> {
    const isSomeInvalidField = this.checkIfHaveSomeInvalidField()
    if(isSomeInvalidField) return undefined

    const formattedValues = this.getFormattedValuesFromFormControls()

    Preferences.set({
      key: 'item-form-controls',
      value: JSON.stringify(formattedValues)
    })
  }

  getFormattedValuesFromFormControls(): FormattedValueFromFormControls {
    return ListFields.reduce((acumulator, field) => {
      acumulator[field] = this.form.get(field)?.value!
      return acumulator
    }, {} as FormattedValueFromFormControls)
  }
}
