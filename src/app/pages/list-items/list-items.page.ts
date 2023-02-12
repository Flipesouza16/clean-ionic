import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { FormattedItemValue } from '../form-item/form-item.page';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.page.html',
  styleUrls: ['./list-items.page.scss'],
})
export class ListItemsPage {
  private urlRouteFormItem = 'form-item'
  public listItems: FormattedItemValue[] = []

  constructor(private router: Router, private storageService: StorageService) { }

  async ionViewDidEnter() {
    this.listItems = await this.getItemsFromStorage()
  }

  async getItemsFromStorage(): Promise<FormattedItemValue[]> {
    try {
      const { value } = await this.storageService.getValue({ key: 'list-items' })

      if(value) {
        const formattedValues: FormattedItemValue[] = JSON.parse(value)
        return formattedValues
      }

    } catch(error) {
      console.error(error)
    }

    return [] as FormattedItemValue[]
  }

  navigateToFormItem(){
    this.router.navigate([`/${this.urlRouteFormItem}`])
  }

}
