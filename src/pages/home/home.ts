import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Utils } from '../../providers/utils/utils';
import { ItemDetailPageComponent } from '../../components/item-detail-page/item-detail-page';
import { Platform } from 'ionic-angular';
import { GoogleMaps } from '@ionic-native/google-maps';
import { ShareService } from '../ShareService/ShareService';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { MyAccountPage } from '../myAccount/myAccount';
import { Keyboard } from '@ionic-native/keyboard';
import { localNotification } from '../../providers/localNotification/localNotification';
import { Badge } from '@ionic-native/badge';

declare var FacebookAds: any;
declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  DiscoveryJsonData: any;
  searchItem = '';
  smoothieItems: any;
  label: any;
  imageUrl: any;
  public eventItems = [];
  public dashboardItemDetail=[];
  data: any;
  eventMonth: String;
  eventDate: Date = new Date();
  index: any;
  start: any = 0;

  constructor(public navCtrl: NavController, private httpProvider: HttpProvider, public utils: Utils, public platform: Platform, private googleMaps: GoogleMaps, private shareService: ShareService, private storage: Storage, private app: App, private keyboard: Keyboard, private localNotification: localNotification, private badge: Badge) {
    		
    
      platform.ready().then(() => {
          this.platform.resume.subscribe(() => {
          console.log('[INFO] App resumed');
          this.badge.clear();
      });
      //get data from the server, display the events users are interested in or display all events if users didnt select any favourite events
      this.getdata();

      //temporary event month, the date needs to be retrieved from the server
      this.eventMonth = this.utils.getMonth(new Date());
    });

      // this.makeRequest2();
    
  }

  // async makeRequest2() {
  //   console.log(await this.makeRequest("hello", "world"));
  // }


  // async makeRequest(a: String, b: String) {
  //   console.log(await this.getJSON(a, b));
  //   return "done";
  // }

  // getJSON(a, b) {
  //   return a + b;
  // }

  getdata(){

    var itemIndex = 0;
    this.utils.createSpinnerThenSpin();

    this.httpProvider.getJsonData().subscribe(
      result => {
        this.utils.dismissSpinner();
        this.DiscoveryJsonData = result.hits;
        this.smoothieItems = Object.keys(this.DiscoveryJsonData).map(function(key) {
  			   return [result.hits[key]];
  		  });
  		
      for(var item in result.hits) {

  			if (this.DiscoveryJsonData.hasOwnProperty(item)) {
  				var value = result.hits[item]; 
  				//value looks like [Log] {recipe: Object, bookmarked: false, bought: false} 
	  			this.eventItems.push({"type" : 0, "imageUrlKey":value.recipe["image"], "labelKey":value.recipe["label"], "ingredients":value.recipe["ingredientLines"],"moreInformation":value.recipe["url"], "itemIndex" : itemIndex});
          itemIndex = itemIndex + 1;
  			}
  		}

  		this.data = this.eventItems
      //temp localNotificationTesting
      this.localNotification.upcomingEvents = this.eventItems;
      //this.localNotification.sendLocalNotification();
      }, err => {
        this.utils.dismissSpinner();
      }
    );
   }


   //for searching events
   getItems() {
      this.utils.createSpinnerThenSpin();
    	this.eventItems = [];
    	for(var item in this.data) {
    		if (this.data.hasOwnProperty(item)) {
    			var value = this.data[item]
    			if(value.labelKey.toLowerCase().includes(this.searchItem.toLowerCase())) {
    				this.eventItems.push({"type" : 0, "imageUrlKey":value.imageUrlKey, "labelKey":value.labelKey, "itemIndex":value.itemIndex, "moreInformation":value.moreInformation });
    			}
    		}
    	}
      this.utils.dismissSpinner();
   }

   goToItemDetail(event, item, i) {
   		this.navCtrl.push(ItemDetailPageComponent, {item: item, allItems: this.eventItems, index: i});
   }

   segmentButtons(segmentButtonName) {
      this.utils.createSpinnerThenSpin();
   		this.eventItems = [];
   		for(var item in this.data) {
   			if (this.data.hasOwnProperty(item)) {
   				var value = this.data[item]
   				switch(segmentButtonName) {
   					case "feature" :
	   					if(value.labelKey.toLowerCase().includes("Mango".toLowerCase())) {
	   						this.eventItems.push({"type" : 0, "imageUrlKey":value.imageUrlKey, "labelKey":value.labelKey,"itemIndex":value.itemIndex, "moreInformation":value.moreInformation  });
	   					}
	   					break;
   					case "trending" :
   						if(value.labelKey.toLowerCase().includes("Strawberry".toLowerCase())) {
	   						this.eventItems.push({"type" : 0, "imageUrlKey":value.imageUrlKey, "labelKey":value.labelKey,"itemIndex":value.itemIndex, "moreInformation":value.moreInformation  });
	   					}
	   					break;
   					case "thisWeek" :
						if(value.labelKey.toLowerCase().includes("Banana".toLowerCase())) {
	   						this.eventItems.push({"type" : 0, "imageUrlKey":value.imageUrlKey, "labelKey":value.labelKey,"itemIndex":value.itemIndex, "moreInformation":value.moreInformation  });
	   					}
   						break;
					case "thisMonth" :
						if(value.labelKey.toLowerCase().includes("green".toLowerCase())) {
	   						this.eventItems.push({"type" : 0, "imageUrlKey":value.imageUrlKey, "labelKey":value.labelKey,"itemIndex":value.itemIndex, "moreInformation":value.moreInformation  });
	   					}
						break;
   				}
   				
   			}
   		}
      this.utils.dismissSpinner();
   		
   }

  saveToDashboard(event, item, eventTag, eventDate, eventMonth, index) {   
      this.shareService.setData(event, item, eventTag, eventDate, eventMonth, index);
  }

  Logout() {
      this.storage.set('login', false);
      this.app.getRootNavs()[0].setRoot(LoginPage);
  }

  goToMyAccountPage() {
      this.navCtrl.push(MyAccountPage);
  }

  dismissKeyBoard(event) {
    if(event.keyCode == 13) {
      this.keyboard.close();
    }
  }

}
