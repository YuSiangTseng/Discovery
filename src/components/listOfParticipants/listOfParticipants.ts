import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player'
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { HttpProvider } from '../../providers/http/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, Marker, MarkerOptions, CameraPosition } from '@ionic-native/google-maps';
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { ShareService } from '../../pages/ShareService/ShareService';
import { MyAccountPage } from '../../pages/myAccount/myAccount';
/**
 * Generated class for the ItemDetailPageComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */

declare var google;

@Component({
  selector: 'listOfParticipants',
  templateUrl: 'listOfParticipants.html',
  providers:[HttpProvider]
})
export class listOfParticipantsPage {

  selectedItem: any;
  index: number;
  allItems: any;
  myDate: String = new Date().toISOString();
  allLinks = '';
  eventMonth: String;
  eventDate: Date = new Date();


  constructor(public navCtrl: NavController, public navParams: NavParams, private youtube: YoutubeVideoPlayer, private domSanitizer: DomSanitizer, public socialSharing:SocialSharing, public platform: Platform, private googleMaps: GoogleMaps, private iab: InAppBrowser, private shareService: ShareService) {
  platform.ready().then(() => {
        console.log('map');
            //this.loadMap();
    });
    this.selectedItem = navParams.get('item');
    //this.index = navParams.get('index');
    this.eventMonth = this.getMonth(new Date());
    //this.allItems = navParams.get('allItems');

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


}
