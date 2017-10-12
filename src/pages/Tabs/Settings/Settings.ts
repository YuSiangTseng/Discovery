import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NotificationSettingsPage } from '../Settings/NotificationSettings/NotificationSettings';
import { AboutHighlightPage } from '../Settings/AboutHighlight/AboutHighlight';
import { HowItWorksPage } from '../Settings/HowItWorks/HowItWorks';
import { FrequentlyAskedQuestionsPage } from '../Settings/FrequentlyAskedQuestions/FrequentlyAskedQuestions';
import { GetInTouchPage } from '../Settings/GetInTouch/GetInTouch';
import { TermsAndConditionsPage } from '../Settings/TermsAndConditions/TermsAndConditions';
import { PersonalAccountPage } from '../../PersonalAccount/PersonalAccount';


@Component({
  selector: 'Settings',
  templateUrl: 'Settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController) {

  }

  goToNotificationSettings() {
  	this.navCtrl.push(NotificationSettingsPage);
  }

  goToHowItWorks() {
  	this.navCtrl.push(HowItWorksPage);
  }

  goToGetInTouch() {
  	this.navCtrl.push(GetInTouchPage);
  }

  goToFrequentlyAskedQuestions() {
    this.navCtrl.push(FrequentlyAskedQuestionsPage);
  }

  goToAboutHighlight() {
    this.navCtrl.push(AboutHighlightPage);
  }

  goToTermsAndConditions() {
    this.navCtrl.push(TermsAndConditionsPage);
  }

  goToMyAccountPage() {
    this.navCtrl.push(PersonalAccountPage);
  }
}
