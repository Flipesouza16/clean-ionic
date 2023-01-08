import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.page.html',
  styleUrls: ['./list-items.page.scss'],
})
export class ListItemsPage implements OnInit {
  private urlRouteFormItem = 'form-item'

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToFormItem(){
    this.router.navigate([`/${this.urlRouteFormItem}`])
  }

}
