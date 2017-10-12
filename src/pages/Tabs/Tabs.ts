import { Component } from '@angular/core';

import { DashboardPage } from '../Tabs/Dashboard/Dashboard';
import { SettingsPage } from '../Tabs/Settings/Settings';
import { DiscoverPage } from '../Tabs/Discover/Discover';

@Component({
  templateUrl: 'Tabs.html'
})
export class TabsPage {

  tab1Root = DiscoverPage;
  tab2Root = DashboardPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
