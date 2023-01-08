import { NgModule } from "@angular/core";
import { FormItemPageModule } from "./form-item/form-item.module";
import { ListItemsPageModule } from "./list-items/list-items.module";

@NgModule({
  imports: [ListItemsPageModule, FormItemPageModule]
})

export class PagesModule {}
