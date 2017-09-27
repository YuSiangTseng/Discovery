import { Component } from '@angular/core';
import { NavController, LoadingController, IonicApp, App } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { ItemDetailPageComponent } from '../../components/item-detail-page/item-detail-page';
import { Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, Marker, MarkerOptions, CameraPosition } from '@ionic-native/google-maps';
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
  loading: any;
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

  constructor(public navCtrl: NavController, private httpProvider: HttpProvider, public loadingCtrl: LoadingController, public platform: Platform, private googleMaps: GoogleMaps, private shareService: ShareService, private storage: Storage, private app: App, private keyboard: Keyboard, private localNotification: localNotification, private badge: Badge) {
    		
    cordova.plugins.notification.local.registerPermission(function (granted) {
      this.storage.set('switchForNotification', granted);
    }.bind(this));

    this.loading = this.loadingCtrl.create({
      content: `
      <ion-spinner ></ion-spinner>`
    });
    this.getdata();
    this.eventMonth = this.getMonth(new Date());
    // document.addEventListener('resume', () => {
    //     console.log("app1");
    //     this.badge.clear();
    // });

    // platform.ready().then(() => {
    //   if(FacebookAds)
    //   {
    //     FacebookAds.createNativeAd('103360493736582_126136838125614');
    //     this.start = 1;
    //     FacebookAds.setOptions({
    //       isTesting: true,
    //       deviceHash: 'e76b3000c917796885256817988ec925d7ab58e1'
    //     });
    //   }
 
    //   document.addEventListener("onAdLoaded", function(data){
    //     let temp: any = data;
 
    //     if(temp.adType == "native")
    //     {
 
    //       document.getElementById('adIcon').setAttribute("src", temp.adRes.icon.url);
    //       document.getElementById('adCover').setAttribute("src", temp.adRes.coverImage.url);
    //       document.getElementById('adTitle').innerHTML = temp.adRes.title;
    //       document.getElementById('adBody').innerHTML = temp.adRes.body;
    //       document.getElementById('adSocialContext').innerHTML = temp.adRes.socialContext;
    //       document.getElementById('adBtn').innerHTML = temp.adRes.buttonText;
    //       console.log("right");
    //     }
    //     console.log("wrong");
 
    //   });

    //   document.addEventListener('onAdFailLoad', function(data) {
    //     alert(data);
    //   });
 
    // });
  }

  getdata(){
    var itemIndex = 0;
    this.loading.present();
    this.httpProvider.getJsonData().subscribe(
      result => {
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
      },
      err =>{
        console.error("Error : "+err);
      } ,
      () => {
        this.loading.dismiss();
        this.storage.get('green').then((val) => {
          if(val != null) {
            this.eventItems = [];
          } 
        });

        this.storage.get('mango').then((val) => {
          if(val != null) {
            this.eventItems = [];
          }
        });


        this.storage.get('mango').then((val) => {
        if(val != null) {
            for(var item in this.data) {
              if (this.data.hasOwnProperty(item)) {
              var value = this.data[item]
              if(value.labelKey.toLowerCase().includes(val.toLowerCase())) {
              console.log(val);
                this.eventItems.push({"type" : 0, "imageUrlKey":value.imageUrlKey, "labelKey":value.labelKey,"itemIndex":value.itemIndex, "moreInformation":value.moreInformation });
              }
            }
          }
        
        }
        });

        this.storage.get('green').then((val) => {
        if(val != null) {
            for(var item in this.data) {
              if (this.data.hasOwnProperty(item)) {
              var value = this.data[item]
              if(value.labelKey.toLowerCase().includes(val.toLowerCase())) {
              console.log(val);
                this.eventItems.push({"type" : 0, "imageUrlKey":value.imageUrlKey, "labelKey":value.labelKey,"itemIndex":value.itemIndex, "moreInformation":value.moreInformation });
              }
            }
          }
        
        }
        });
      }
    );
   }

   getItems() {
   this.loading = this.loadingCtrl.create({
      content: `
      <ion-spinner ></ion-spinner>`
    });
 		this.eventItems = [];
 		for(var item in this.data) {
 			if (this.data.hasOwnProperty(item)) {
 				var value = this.data[item]
 				if(value.labelKey.toLowerCase().includes(this.searchItem.toLowerCase())) {
 					this.eventItems.push({"type" : 0, "imageUrlKey":value.imageUrlKey, "labelKey":value.labelKey, "itemIndex":value.itemIndex, "moreInformation":value.moreInformation });
 				}
 			}
 		}
 		this.loading.dismiss();
   }

   goToItemDetail(event, item, i) {
   		this.navCtrl.push(ItemDetailPageComponent, {item: item, allItems: this.eventItems, index: i});
   }

   segmentButtons(segmentButtonName) {
   	  this.loading = this.loadingCtrl.create({
      content: `
      <ion-spinner ></ion-spinner>`
      });
   		console.log(this.searchItem)
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
   		this.loading.dismiss();
   		
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
