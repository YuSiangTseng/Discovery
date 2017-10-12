import { Component, ViewChild} from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Nav, Platform } from 'ionic-angular';

import { TabsPage } from '../pages/Tabs/Tabs';
import { UserLoginPage } from '../pages/UserLogin/UserLogin';
import { Storage } from '@ionic/storage';
import { Badge } from '@ionic-native/badge';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage, private badge: Badge) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault();
      statusBar.backgroundColorByHexString('#ffffff');
      splashScreen.hide();

      // this.platform.pause.subscribe(() => {
      //     console.log('[INFO] App paused');
      // });
  
    
      storage.get('login').then((val) => {
      if(val == true) {
        this.rootPage = TabsPage;
        //this.nav.setRoot(TabsPage);
      } else {
        this.rootPage = UserLoginPage;
        //this.nav.setRoot(LoginPage);
      }
      });
      // this.badge.registerPermission();
      
    });
    // document.addEventListener('resume', () => {
    //     console.log("app2");
    //     this.badge.clear();
    // });

  }
}
