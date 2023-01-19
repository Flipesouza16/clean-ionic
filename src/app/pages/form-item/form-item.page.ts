import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormItemCreate } from './form-item-create.interface';
import { GeolocationService } from 'src/app/shared/services/geolocation/geolocation.service';
import { Localization } from 'src/app/shared/interfaces/geolocation/geolocation.interface';
import { Camera } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { CameraResultType, CameraSource } from '@capacitor/camera/dist/esm/definitions';

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
  public image = ''

  constructor(
    private platform: Platform,
    private location: Location,
    private formBuilder: FormBuilder,
    private geolocationService: GeolocationService,
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.backToPreviousPage();
    });

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      localizationLongitude: ['' , Validators.required],
      localizationLatitude: ['' , Validators.required],
    });

    this.updateLocalization(this.form)
  }

  backToPreviousPage(): void {
    this.location.back();
  }

  updateLocalization(form: FormGroup<ReactiveFormItemCreate>): void {
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
    const newLocalization = await this.geolocationService.getCurrentLocalization()

    if(newLocalization) {
      this.isLocalizationFilled = true
      this.localization = newLocalization;
      this.setReactiveFormLocalization(newLocalization);
    }
  }

  async openCamera(): Promise<void> {
    const image = await Camera.getPhoto({
      quality: 90,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri
    })

    if(image.path) {
      this.image = Capacitor.convertFileSrc(image.path)
    }
  }

  submit(): void {
    console.log('this.form.controls: ', this.form.controls);
  }
}
