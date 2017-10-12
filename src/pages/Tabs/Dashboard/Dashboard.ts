import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PersonalAccountPage } from '../../PersonalAccount/PersonalAccount';
import { ShareService } from '../../ShareService/ShareService';
import { EventDetailPage } from '../../../components/EventDetail/EventDetail';
@Component({
  selector: 'Dashboard',
  templateUrl: 'Dashboard.html'
})
export class DashboardPage {
  private dashboardItemDetail = [];
  constructor(public navCtrl: NavController, private shareService: ShareService) {
  		this.dashboardItemDetail = this.shareService.getDashboardItemDetail();
  }

  goToItemDetail(event, item, i) {
   		this.navCtrl.push(EventDetailPage, {item: item, allItems: [], index: i});
  }

  goToMyAccountPage() {
      this.navCtrl.push(PersonalAccountPage);
  }

}
