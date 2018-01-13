import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public alert: AlertController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Encuesta', component: HomePage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openSettings() {
    this.alert.create({
      title: "Contraseña",
      inputs: [{
        name: 'password',
        label: "Contraseña",
        type: "password"
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: "OK",
          handler: (data) => {
            if (data.password == 'dufloadmin06') {
              this.nav.setRoot(ListPage);
            }
          }
        }
      ]
    }).present()
  }
}
