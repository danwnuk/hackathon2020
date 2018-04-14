import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { RestProvider } from '../../providers/rest/rest';

declare var google;

@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
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
export class OffersPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  offers: any[] = [
  ];

  images: string[] = [
    'https://www.runnersworld.com/sites/runnersworld.com/files/styles/listicle_slide_custom_user_phone_1x/public/reebok_harmony_w_400.jpg?itok=U3lsw4qz',
    'https://www.villagehatshop.com/photos/product/standard/4511390S59716/all/propeller-beanie-hat.jpg',
    'https://img.buzzfeed.com/buzzfeed-static/static/2015-06/1/14/enhanced/webdr08/enhanced-28002-1433185096-8.png?downsize=715:*&output-format=auto&output-quality=auto'
  ];

  displayMode: string = 'list';  

  errorMessage: string;

  constructor(
    public navCtrl: NavController,
    public rest: RestProvider,
    public geolocation: Geolocation
  ) {
  }

  ngOnInit() {
    this.rest.getOffers(36.169941, -115.139830).subscribe(offers => {
      
      offers.forEach(offer => {
        const random = Math.floor(Math.random() * (this.images.length));
  
        offer.image = this.images[random];
      });
      
      this.offers = offers;
    });
  }

  ionViewDidLoad() {
    
  }



  initMap() {
        this.geolocation.getCurrentPosition().then(resp => {
          const position = {
            lat: resp.coords.latitude,
            lng: resp.coords.longitude
          };
    
    
          this.map = new google.maps.Map(this.mapElement.nativeElement, {
            zoom: 11,
            center: position
          });
    
          
          var markers = [];
    
          this.offers.forEach(offer => {
            console.log('in offer', offer);
            offer.locations.forEach(location => {
              console.log('location', location);
              const pos = {
                lat: location.position.lat,
                lng: location.position.lng
              }

              var marker = new google.maps.Marker({
                position: pos,
                map: this.map,
                title: location.merchantName
              });

              console.log('creating marker');
      
              markers.push(marker);
      
              var contentString = `
                <ion-card-title [style.paddingBottom]="'0px'" [style.marginBottom]="'0px'">
                    ${offer.offerTitle}
                </ion-card-title>

                <br>
                <br>

                ${location.merchantName}

                <br>
                
                ${location.address}
      
                <div [style.paddingTop]="'10px'">
                  <div [style.display]="'inline-block'" [style.width]="'32%'" [style.textAlign]="'center'">
                    <ion-icon name="clock"></ion-icon>
                    <div>${location.waitTime} minute wait time</div>
                  </div>
                  <div [style.display]="'inline-block'" [style.width]="'32%'" [style.textAlign]="'center'">
                    <ion-icon name="car"></ion-icon>
                    <div>${location.distance} mi</div>
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
          });
        }).catch(error => {
          this.map = new google.maps.Map(this.mapElement.nativeElement, {
            zoom: 3,
            center: {lat: 36, lng: -115}
          });
        })
    
      }
  
  handleDisplayModeChange() {
    if (this.displayMode === 'map') {
      setTimeout(() => this.initMap(), 0);
    }
  }

}