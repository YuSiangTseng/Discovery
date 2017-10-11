import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { ShareService } from '../../pages/ShareService/ShareService';
import { MyAccountPage } from '../../pages/myAccount/myAccount';
import { participantProfilePage } from '../participantProfile/participantProfile';


@Component({
  selector: 'listOfParticipants',
  templateUrl: 'listOfParticipants.html',
  providers:[ HttpProvider ]
})
export class listOfParticipantsPage {

  selectedItem: any;
  index: number;
  allItems: any;
  myDate: String = new Date().toISOString();
  allLinks = '';
  eventMonth: String;
  eventDate: Date = new Date();
  participants = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private shareService: ShareService, private http: HttpProvider) {
 
    this.selectedItem = navParams.get('item');
    this.index = navParams.get('index');
    this.eventMonth = this.getMonth(new Date());

    for(var index in http.getParticipants()) {
      if(http.getParticipants()[index].showMyDetail == true) {
        this.participants.push(http.getParticipants()[index]);
      }
    }

  }


  getMonth(date) {
    switch(date.getMonth()) {
      case 0:
        return "Jan";
      case 1:
        return "Feb";
      case 2:
        return "Mar";
      case 3:
        return "Apr";
      case 4:
        return "May";
      case 5:
        return "Jun";
      case 6:
        return "Jul";
      case 7:
        return "Aug";
      case 8:
        return "Sep";
      case 9:
        return "Oct";
      case 10:
        return "Nov";
      case 11:
        return "Dec";

    }

  }

  saveToDashboard(event, item, eventTag, eventDate, eventMonth, index) {  
      this.shareService.setData(event, item, eventTag, eventDate, eventMonth, index);
  }

  goToMyAccountPage() {
      this.navCtrl.push(MyAccountPage);
  }

  goToParticipantProfile(event, participantDetail) {
      this.navCtrl.push(participantProfilePage, {participantDetail: participantDetail});
  }


}
