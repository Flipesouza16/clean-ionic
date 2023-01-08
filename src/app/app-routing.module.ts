import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FormItemPage } from './pages/form-item/form-item.page';
import { ListItemsPage } from './pages/list-items/list-items.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-items',
    pathMatch: 'full'
  },
  {
    path: 'list-items',
    component: ListItemsPage
  },
  {
    path: 'form-item',
    component: FormItemPage
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
