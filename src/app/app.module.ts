import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { GeolocalizationRepository } from './repositories/geolocalization-repository';
import { GeolocationCapacitorService } from 'src/infra/plugins/geolocalization-capacitor.service';

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
      provide: GeolocalizationRepository,
      useClass: GeolocationCapacitorService
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
