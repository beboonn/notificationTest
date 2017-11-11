import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FCM } from '@ionic-native/fcm';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the NotiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-noti',
  templateUrl: 'noti.html',
})
export class NotiPage {

  registerToken: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private platform: Platform,
    private fcm: FCM){

      if (platform.is('cordova')){
        
        fcm.getToken().then(token=>{
          this.registerToken = token;
          console.log('registerToken: '+this.registerToken);
        })
        
        fcm.onNotification().subscribe(data=>{
          if(data.wasTapped){
            console.log("Received in background");
          } else {
            console.log("Received in foreground");
          };
        })
        
        fcm.onTokenRefresh().subscribe(token=>{
          this.registerToken = token;
        })
      }
      
      
      
  }
  

}
