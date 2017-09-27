import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyDetailPage } from '../myDetail/myDetail';
import { MyFavouriteEventPage } from '../myFavouriteEvent/myFavouriteEvent';
import { myWorkPlacePage } from '../myWorkPlace/myWorkPlace';

@Component({
  selector: 'page-myAccount',
  templateUrl: 'myAccount.html'
})
export class MyAccountPage {

  constructor(public navCtrl: NavController) {

  }


  goToMyAccount() {
  	this.navCtrl.push(MyDetailPage);
  }

  goToMyFavouriteEvent() {
  	this.navCtrl.push(MyFavouriteEventPage);
  }

  goToMyWorkPlace() {
    this.navCtrl.push(myWorkPlacePage);
  }
}
