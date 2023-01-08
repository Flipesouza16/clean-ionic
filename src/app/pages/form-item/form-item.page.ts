import { Component } from '@angular/core';
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
    private formBuilder: FormBuilder
  ) {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      localization: ['', Validators.required],
    });
  }

  submit(): void {
    console.log('this.form.controls: ',this.form.controls);
  }

}
