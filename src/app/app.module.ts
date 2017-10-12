import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';



import { TabsPage } from '../pages/Tabs/Tabs';
import { DiscoverPage } from '../pages/Tabs/Discover/Discover';
import { DashboardPage } from '../pages/Tabs/Dashboard/Dashboard';
import { EventDetailPage } from '../components/EventDetail/EventDetail';
import { ParticipantsPage } from '../components/Participants/Participants';
import { ParticipantProfilePage } from '../components/ParticipantProfile/ParticipantProfile';
import { SearchEventsMenuPage } from '../pages/Tabs/Discover/SearchEventsMenu/SearchEventsMenu';

//Login and Register
import { UserLoginPage } from '../pages/UserLogin/UserLogin';
import { RegisterPersonalDetailPage } from '../pages/Register/RegisterPersonalDetail/RegisterPersonalDetail';
import { RegisterWorkPlacePage } from '../pages/Register/RegisterWorkPlace/RegisterWorkPlace';
import { RegisterFavouriteEventPage } from '../pages/Register/RegisterFavouriteEvent/RegisterFavouriteEvent';

//PersonalAccount
import { PersonalAccountPage } from '../pages/PersonalAccount/PersonalAccount';
import { UserDetailPage } from '../pages/PersonalAccount/UserDetail/UserDetail';
import { PersonalFavouriteEventPage } from '../pages/PersonalAccount/PersonalFavouriteEvent/PersonalFavouriteEvent';
import { PersonalWorkPlacePage } from '../pages/PersonalAccount/PersonalWorkPlace/PersonalWorkPlace';

//Settings
import { SettingsPage } from '../pages/Tabs/Settings/Settings';
import { NotificationSettingsPage } from '../pages/Tabs/Settings/NotificationSettings/NotificationSettings';
import { AboutHighlightPage } from '../pages/Tabs/Settings/AboutHighlight/AboutHighlight';
import { HowItWorksPage } from '../pages/Tabs/Settings/HowItWorks/HowItWorks';
import { FrequentlyAskedQuestionsPage } from '../pages/Tabs/Settings/FrequentlyAskedQuestions/FrequentlyAskedQuestions';
import { GetInTouchPage } from '../pages/Tabs/Settings/GetInTouch/GetInTouch';
import { TermsAndConditionsPage } from '../pages/Tabs/Settings/TermsAndConditions/TermsAndConditions';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpProvider } from '../providers/HttpProvider/HttpProvider';
import { UtilsProvider } from '../providers/UtilsProvider/UtilsProvider';
import { LocalNotificationProvider } from '../providers/LocalNotificationProvider/LocalNotificationProvider';
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
import { Facebook } from '@ionic-native/facebook';
import { Keyboard } from '@ionic-native/keyboard';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Badge } from '@ionic-native/badge';
import { Calendar } from '@ionic-native/calendar';
import { EmailComposer } from '@ionic-native/email-composer';



@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    SettingsPage,
    DiscoverPage,
    TabsPage,
    EventDetailPage,
    ParticipantsPage,
    ParticipantProfilePage,
    UserLoginPage,
    PersonalAccountPage,
    UserDetailPage,
    PersonalFavouriteEventPage,
    RegisterPersonalDetailPage,
    RegisterWorkPlacePage,
    RegisterFavouriteEventPage,
    PersonalWorkPlacePage,
    NotificationSettingsPage,
    HowItWorksPage,
    GetInTouchPage,
    FrequentlyAskedQuestionsPage,
    AboutHighlightPage,
    TermsAndConditionsPage,
    SearchEventsMenuPage
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
    DashboardPage,
    SettingsPage,
    DiscoverPage,
    TabsPage,
    EventDetailPage,
    ParticipantsPage,
    ParticipantProfilePage,
    UserLoginPage,
    PersonalAccountPage,
    UserDetailPage,
    PersonalFavouriteEventPage,
    RegisterPersonalDetailPage,
    RegisterWorkPlacePage,
    RegisterFavouriteEventPage,
    PersonalWorkPlacePage,
    NotificationSettingsPage,
    HowItWorksPage,
    GetInTouchPage,
    FrequentlyAskedQuestionsPage,
    AboutHighlightPage,
    TermsAndConditionsPage,
    SearchEventsMenuPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider,
    UtilsProvider,
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
    LocalNotificationProvider,
    Badge,
    Calendar,
    EmailComposer
  ]
})
export class AppModule {}
