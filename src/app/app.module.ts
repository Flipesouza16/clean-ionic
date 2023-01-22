import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { GeolocationRepository } from './repositories/geolocation-repository';
import { GeolocationCapacitorService } from 'src/infra/plugins/geolocation-capacitor.service';
import { CameraRepository } from './repositories/camera-repository';
import { CameraCapacitorService } from 'src/infra/plugins/camera-capacitor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    PagesModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: GeolocationRepository,
      useClass: GeolocationCapacitorService
    },
    {
      provide: CameraRepository,
      useClass: CameraCapacitorService
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
