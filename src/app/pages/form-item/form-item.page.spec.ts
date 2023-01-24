import { FormItemPage } from "./form-item.page"
import { GeolocationService } from "src/app/shared/services/geolocation/geolocation.service";
import { CameraService } from "src/app/shared/services/camera/camera.service";
import { InMemoryGeolocationRepository } from "src/tests/repositories/in-memory-geolocation-repository";
import { InMemoryCameraRepository } from "src/tests/repositories/in-memory-camera-repository";

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormItemPageModule } from "./form-item.module";

describe('form-item.page', () => {
  let formItemPage: FormItemPage
  let fixture: ComponentFixture<FormItemPage>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormItemPageModule
      ],
      providers: [
        {
          provide: GeolocationService,
          useClass: InMemoryGeolocationRepository
        },
        {
          provide: CameraService,
          useClass: InMemoryCameraRepository
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(FormItemPage)
    formItemPage = fixture.componentInstance
  })

  it('should instance form item page', async () => {
    expect(formItemPage).toBeTruthy()
  })
})
