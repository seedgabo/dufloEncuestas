import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SurveyProvider } from '../providers/survey/survey';

import { IonicStorageModule } from '@ionic/storage';
import { FileOpener } from "@ionic-native/file-opener";
import { File } from "@ionic-native/file";
import { FileTransfer } from "@ionic-native/file-transfer";
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen, File, FileTransfer, FileOpener
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SurveyProvider
  ]
})
export class AppModule { }
