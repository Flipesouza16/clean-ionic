import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormItemCreate } from './form-item-create.interface';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.page.html',
  styleUrls: ['./form-item.page.scss'],
})
export class FormItemPage {
  public form: FormGroup<ReactiveFormItemCreate>;

  constructor(
    private platform: Platform,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.backToPreviousPage()
    });

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      localization: ['', Validators.required],
    });
  }

  submit(): void {
    console.log('this.form.controls: ',this.form.controls);
  }

  backToPreviousPage(): void {
    this.location.back();
  }
}
