import { FormControl } from "@angular/forms"

export type ReactiveFormItemCreate = {
  name: FormControl<string | null>;
  localization: FormControl<string | null>;
  image: FormControl<string | null>;
}
