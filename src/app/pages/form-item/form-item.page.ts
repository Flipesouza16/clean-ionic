import { Component } from '@angular/core';
import { Device } from '@capacitor/device';
import { Platform, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormItemCreate } from './form-item-create.interface';
import { GeolocationService } from 'src/app/shared/services/geolocation/geolocation.service';
import { Localization } from 'src/app/shared/interfaces/geolocation/geolocation.interface';
import { Capacitor } from '@capacitor/core';
import { CameraService } from 'src/app/shared/services/camera/camera.service';
import { Photo } from '@capacitor/camera';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { Router } from '@angular/router';

const ListFields = ['name', 'image', 'localizationLongitude', 'localizationLatitude'] as const
type AllFiedls = typeof ListFields[number]

export type FormattedItemValue = {
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
  public plataforma: string | undefined

  constructor(
    private platform: Platform,
    private router: Router,
    public location: Location,
    private formBuilder: FormBuilder,
    public geolocationService: GeolocationService,
    public cameraService: CameraService,
    public toastCtrl: ToastController,
    public storageService: StorageService,
  ) {
    Device.getInfo().then(info => {
      this.plataforma = info.platform
    })

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

    if(photo) {
      this.updatePhoto(photo)
    }
  }

  async getPhoto(): Promise<Photo> {
    const photo = await this.cameraService.openCamera()
    return photo
  }

  updatePhoto(image: Photo): void {
    if(this.plataforma !== 'web') {
      this.updatePhotoMobile(image)
    }
    else if(this.plataforma === 'web' && image.webPath) {
      this.updatePhotoWeb(image)
    }
  }

  updatePhotoMobile(image: Photo): void {
    if(image.path) {
      this.photo = Capacitor.convertFileSrc(image.path)
      this.form.controls['image'].setValue(this.photo)
    }
  }

  updatePhotoWeb(image: Photo): void {
    if(image.webPath) {
      this.photo = Capacitor.convertFileSrc(image.webPath)
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

  async openToast(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      position: 'top'
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

    const existingItems = await this.getExistingItems()

    existingItems.push(formattedValues)

    this.openToast('Item added with success!')

    await this.storageService.setValue({
      key: 'list-items',
      value: JSON.stringify(existingItems)
    })

    this.router.navigate([''])
  }

  async getExistingItems(): Promise<FormattedItemValue[]> {
    const { value } = await this.storageService.getValue({ key: 'list-items' })

    const listItems: FormattedItemValue[] = value ? JSON.parse(value) : []

    return listItems
  }

  getFormattedValuesFromFormControls(): FormattedItemValue {
    return ListFields.reduce((acumulator, field) => {
      acumulator[field] = this.form.get(field)?.value!
      return acumulator
    }, {} as FormattedItemValue)
  }
}
