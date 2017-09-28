import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { notificationSettingsPage } from '../notificationSettings/notificationSettings';
import { howItWorksPage } from '../howItWorks/howItWorks';
import { getInTouchPage } from '../getInTouch/getInTouch';
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class settingsPage {

  constructor(public navCtrl: NavController) {

  }

  goToNotificationSettings() {
  	this.navCtrl.push(notificationSettingsPage);
  }

  goToHowItWorks() {
  	this.navCtrl.push(howItWorksPage);
  }

  goToGetInTouch() {
  	this.navCtrl.push(getInTouchPage);
  }

}
