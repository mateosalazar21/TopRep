import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.showSplashScreen();
  }

  async showSplashScreen() {
    // Show the splash for an indefinite amount of time:
    await SplashScreen.show({
      autoHide: true,
      showDuration: 3000
    });
  }
}
