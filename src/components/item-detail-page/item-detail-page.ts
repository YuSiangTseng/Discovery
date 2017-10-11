import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { HttpProvider } from '../../providers/http/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Platform } from 'ionic-angular';
import { GoogleMaps, LatLng } from '@ionic-native/google-maps';
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { ShareService } from '../../pages/ShareService/ShareService';
import { MyAccountPage } from '../../pages/myAccount/myAccount';
import { listOfParticipantsPage } from '../listOfParticipants/listOfParticipants';
import { Utils } from '../../providers/utils/utils';

declare var google;

@Component({
  selector: 'item-detail-page',
  templateUrl: 'item-detail-page.html',
  providers:[HttpProvider]
})
export class ItemDetailPageComponent {

  selectedItem: any;
  index: number;
  allItems: any;
  myDate: String = new Date().toISOString();
  videoUrl: SafeResourceUrl;
  allLinks = '';
  //map: GoogleMap;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  eventMonth: String;
  eventDate: Date = new Date();

  ionViewDidLoad(){
    this.loadMap();
  }

  constructor(public navCtrl: NavController, private utils: Utils, public navParams: NavParams, private domSanitizer: DomSanitizer, public socialSharing:SocialSharing, public platform: Platform, private iab: InAppBrowser, private shareService: ShareService) {
  
    this.selectedItem = navParams.get('item');
    this.index = navParams.get('index');
    this.eventMonth = this.utils.getMonth(new Date());
    this.allItems = navParams.get('allItems');
    this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/DuwXCFyo4-w')

  }


  loadMap() {
     let latLng = new google.maps.LatLng(51.524657, -0.087164);
   
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
   
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker();
  }

  addMarker(){
    let mintTwistPosition = new LatLng(51.524657, -0.087164);
   
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: mintTwistPosition,
      title: 'MintTwist'
    });

  }

  openLink(link) {
    window.open(link, '_system', 'location=yes');
  }


  sendEmail() {
    for(var item in this.allItems) {
    	var value = this.allItems[item];
    	this.allLinks = this.allLinks + value["labelKey"] + " : " + value["moreInformation"] + "\n";
    }

  	if (this.platform.is('cordova')) {
        this.socialSharing.canShareViaEmail().then(() => {
          this.socialSharing.shareViaEmail(this.allLinks, 'Recipes', ['yusiangtseng@gmail.com']).then(() => {
          }).catch(() => {
              alert("Uh!! Seems like some issues right now, please try later");
          });
        })
  	} else {
  	  console.log("use device");
  	}
	
  }

  launch(url) {
    this.platform.ready().then(() => {
        const browser = this.iab.create(url);
    });
  }

  saveToDashboard(event, item, eventTag, eventDate, eventMonth, index) {  
      this.shareService.setData(event, item, eventTag, eventDate, eventMonth, index);
  }

  goToMyAccountPage() {
      this.navCtrl.push(MyAccountPage);
  }

  goToListOfParticipants(event, selectedItem, index) {
      this.navCtrl.push(listOfParticipantsPage, {item: selectedItem, index: index});
  }

}
