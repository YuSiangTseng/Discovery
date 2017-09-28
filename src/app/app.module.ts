import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { settingsPage } from '../pages/settings/settings';
import { notificationSettingsPage } from '../pages/notificationSettings/notificationSettings';
import { howItWorksPage } from '../pages/howItWorks/howItWorks';
import { getInTouchPage } from '../pages/getInTouch/getInTouch';
import { frequentlyAskedQuestionsPage } from '../pages/frequentlyAskedQuestions/frequentlyAskedQuestions';
import { aboutHighlightPage } from '../pages/aboutHighlight/aboutHighlight';
import { termsAndConditionsPage } from '../pages/termsAndConditions/termsAndConditions';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ItemDetailPageComponent } from '../components/item-detail-page/item-detail-page';
import { LoginPage } from '../pages/login/login';
import { MyAccountPage } from '../pages/myAccount/myAccount';
import { MyDetailPage } from '../pages/myDetail/myDetail';
import { registerPage } from '../pages/register/register';
import { registerWorkPlacePage } from '../pages/registerWorkPlace/registerWorkPlace';
import { MyFavouriteEventPage } from '../pages/myFavouriteEvent/myFavouriteEvent';
import { registerFavouriteEventPage } from '../pages/registerFavouriteEvent/registerFavouriteEvent';
import { myWorkPlacePage } from '../pages/myWorkPlace/myWorkPlace';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpProvider } from '../providers/http/http';
import { localNotification } from '../providers/localNotification/localNotification';
import { HttpModule } from '@angular/http';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player'
import { SocialSharing } from '@ionic-native/social-sharing';
import { GoogleMaps } from '@ionic-native/google-maps';
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { ShareService } from '../pages/ShareService/ShareService';
import { IonicStorageModule } from '@ionic/storage';
import { Keychain } from '@ionic-native/keychain';
import { CalendarModule } from "ion2-calendar";
import { MomentModule } from 'angular2-moment';
import { Camera } from '@ionic-native/camera';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Keyboard } from '@ionic-native/keyboard';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Badge } from '@ionic-native/badge';
import { Calendar } from '@ionic-native/calendar';
import { EmailComposer } from '@ionic-native/email-composer';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    settingsPage,
    HomePage,
    TabsPage,
    ItemDetailPageComponent,
    LoginPage,
    MyAccountPage,
    MyDetailPage,
    MyFavouriteEventPage,
    registerPage,
    registerWorkPlacePage,
    registerFavouriteEventPage,
    myWorkPlacePage,
    notificationSettingsPage,
    howItWorksPage,
    getInTouchPage,
    frequentlyAskedQuestionsPage,
    aboutHighlightPage,
    termsAndConditionsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'bottom', 'backButtonText':''}),
    IonicStorageModule.forRoot(),
    CalendarModule,
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    settingsPage,
    HomePage,
    TabsPage,
    ItemDetailPageComponent,
    LoginPage,
    MyAccountPage,
    MyDetailPage,
    MyFavouriteEventPage,
    registerPage,
    registerWorkPlacePage,
    registerFavouriteEventPage,
    myWorkPlacePage,
    notificationSettingsPage,
    howItWorksPage,
    getInTouchPage,
    frequentlyAskedQuestionsPage,
    aboutHighlightPage,
    termsAndConditionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider,
    YoutubeVideoPlayer,
    SocialSharing,
    GoogleMaps,
    InAppBrowser,
    ShareService,
    Keychain,
    Camera,
    Facebook,
    Keyboard,
    LocalNotifications,
    localNotification,
    Badge,
    Calendar,
    EmailComposer
  ]
})
export class AppModule {}
