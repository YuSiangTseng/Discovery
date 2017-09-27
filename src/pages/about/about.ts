import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MyAccountPage } from '../myAccount/myAccount';
import { ShareService } from '../ShareService/ShareService';
import { ItemDetailPageComponent } from '../../components/item-detail-page/item-detail-page';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  private dashboardItemDetail = [];
  constructor(public navCtrl: NavController, private shareService: ShareService) {
  		this.dashboardItemDetail = this.shareService.getDashboardItemDetail();
  }

  goToItemDetail(event, item, i) {
   		this.navCtrl.push(ItemDetailPageComponent, {item: item, allItems: [], index: i});
  }

  goToMyAccountPage() {
      this.navCtrl.push(MyAccountPage);
  }

}
