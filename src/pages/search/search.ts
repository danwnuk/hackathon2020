import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { RestProvider } from '../../providers/rest/rest';

declare var google;

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  styles: [`
    .notification-count {
      left: 45%;
      bottom: 60%;
      position: absolute;
      font-size: 8pt;
      font-weight: bold;
      color: white;
      border-radius: 50%;
      background-color: red;
      width: 20px;
      height: 20px;
      padding-top: 7px;
      opacity: .8
    }
  `]
})
export class SearchPage {
  items: any[] = [];
  displayMode: string = 'list';
  
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  images: string[] = [
    'https://www.runnersworld.com/sites/runnersworld.com/files/styles/listicle_slide_custom_user_phone_1x/public/reebok_harmony_w_400.jpg?itok=U3lsw4qz',
    'https://www.villagehatshop.com/photos/product/standard/4511390S59716/all/propeller-beanie-hat.jpg',
    'https://img.buzzfeed.com/buzzfeed-static/static/2015-06/1/14/enhanced/webdr08/enhanced-28002-1433185096-8.png?downsize=715:*&output-format=auto&output-quality=auto'
  ];

  constructor(
    public navCtrl: NavController,
    public restProvider: RestProvider,
    public geolocation: Geolocation,
    public alertCtrl: AlertController
  ) {
    
  }

  getItems(ev: any) {

    // set val to the value of the searchbar
    let val = ev.target.value;
    

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.restProvider.getStoresByKeyword(36.169941, -115.139830, val).subscribe(data => {
        data.forEach(store => {
          var d = new Date();
          var weekday = d.getDay() - 1;
          var hours = d.getHours();
    
          if (weekday === -1)
            weekday = 6;
  
          let times = [];
          var i = hours;
          for (; i < store.popularTimes.popularTimes[weekday].data.length; i++) {
            let name = '';
            if (i%3 === 0) {
              name = (i > 12? (i - 12) + 'p': i + 'a');
            }
            times.push({name: name, value: store.popularTimes.popularTimes[weekday].data[i]});
          }
  
          weekday++;
  
          if (weekday > 6)
            weekday = 0;
  
          var j = 0;
          while (times.length < 24) {
            let name = '';
            if ((i + j)%3 === 0) {
              name = ((i + j) > 12? ((i + j) - 12) + 'p': (i + j) + 'a');
            }
  
            times.push({name: name, value: store.popularTimes.popularTimes[weekday].data[j++] });
          }
  
          store.times = times;
          
          store.offers.forEach(offer => {
            const random = Math.floor(Math.random() * (this.images.length));
      
            offer.image = this.images[random];
          });
        });

        console.log('data', data);
        this.items = data;
      })
    }
  }
  
  handleDisplayModeChange() {
    if (this.displayMode === 'map') {
      setTimeout(() => this.initMap(), 0);
    }
  }
  
    initMap() {
  
  
      this.geolocation.getCurrentPosition().then(resp => {
        const position = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        };
  
  
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          zoom: 8,
          center: position
        });
  
        var markers = [];
  
        this.items.forEach(store => {
          const pos = {
            lat: store.location.lat,
            lng: store.location.lon
          }
          
  
          var marker = new google.maps.Marker({
            position: pos,
            map: this.map,
            title: store.merchantName
          });
  
          markers.push(marker);
  
          var contentString = `
            <ion-card-title [style.paddingBottom]="'0px'" [style.marginBottom]="'0px'">
                ${store.merchantName}
            </ion-card-title>
            
            <br>

            ${store.address.streetAddress1}
  
            <div [style.paddingTop]="'10px'">
              <div [style.display]="'inline-block'" [style.width]="'32%'" [style.textAlign]="'center'">
                <ion-icon name="pricetags" [style.color]="${store.offers}? 'green': 'red'"></ion-icon>
                <div>No offers</div>
              </div>
              <div [style.display]="'inline-block'" [style.width]="'32%'" [style.textAlign]="'center'">
                <ion-icon name="clock"></ion-icon>
                <div>${store.waitTime} minute wait time</div>
              </div>
              <div [style.display]="'inline-block'" [style.width]="'32%'" [style.textAlign]="'center'">
                <ion-icon name="car"></ion-icon>
                <div>${store.distance} mi</div>
              </div>
            </div>
          `;
  
          var infowindow = new google.maps.InfoWindow({
            content: contentString
          });
        
          marker.addListener('click', function() {
            infowindow.open(this.map, marker);
          });
        });
      }).catch(error => {
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          zoom: 3,
          center: {lat: 36, lng: -115}
        });
      })
  
    }

    showAlert() {
      console.log('in show alert');
      let alert = this.alertCtrl.create({
        title: 'Burger King Update',
        subTitle: 'The wait time at Burger King on 11000 W LAKE PARK DRIVE is now less than 10 minutes!',
        buttons: ['OK']
      });
      alert.present();
    }
}
