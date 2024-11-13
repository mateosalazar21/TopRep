import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  activeTab = 'home';  // Default tab

  constructor(private router: Router) { 
    // Track navigation changes to update activeTab
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentTab = event.urlAfterRedirects.split('/')[2];
        this.activeTab = currentTab || 'home';
      }
    });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() { }

  // Method to check if a tab is active for dynamic styling
  isActive(tab: string): boolean {
    const currentTab = this.router.url.split('/')[2]; // Obtén el nombre de la ruta activa
    return currentTab === tab;
  }
  
}
