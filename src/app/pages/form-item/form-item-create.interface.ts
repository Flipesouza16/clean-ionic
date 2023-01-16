import { FormControl } from "@angular/forms"

export type ReactiveFormItemCreate = {
  name: FormControl<string | null>;
  localizationLongitude: FormControl<string | null>;
  localizationLatitude: FormControl<string | null>;
  image: FormControl<string | null>;
}
