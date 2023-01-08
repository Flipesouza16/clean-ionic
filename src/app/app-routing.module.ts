import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
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
    // loadChildren: () => import('./pages/list-items/list-items.module').then( m => m.ListItemsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
