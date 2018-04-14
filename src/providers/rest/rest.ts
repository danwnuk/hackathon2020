import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class RestProvider {
  private apiKey = 'api_key_removed';
  constructor(
    public http: Http
  ) {
    console.log('Hello RestProvider Provider');
  }

  getStores(latitude, longitude): Observable<any[]> {
    return this.http.get(`http://localhost:8080/stores?lon=${longitude}&lat=${latitude}`)
                    .map(this.extractData)
                    .map(data => {
                      console.log(data);
                      data.forEach(store => {
                        store.photos.href = store.photos.href + `&key=${this.apiKey}&maxheight=100&maxwidth=290`;
                        store.waitTime = Math.round(store.waitTime / 60);
                      })
                      
                      return data;
                    })
                    .catch(this.handleError);
  }
  
    getStoresByKeyword(latitude, longitude, keyword): Observable<any[]> {
      return this.http.get(`http://localhost:8080/stores?lon=${longitude}&lat=${latitude}&keyword=${keyword}`)
                      .map(this.extractData)
                      .map(data => {
                        console.log(data);
                        data.forEach(store => {
                          store.photos.href = store.photos.href + `&key=${this.apiKey}&maxheight=${store.photos.height}`;
                          store.waitTime = Math.round(store.waitTime / 60);
                        })
                        
                        return data;
                      })
                      .catch(this.handleError);
    }
    
      getOffers(latitude, longitude): Observable<any[]> {
        return this.http.get(`http://localhost:8080/stores?lon=${longitude}&lat=${latitude}`)
                        .map(this.extractData)
                        .map(data => {
                          let offers = [];
                          let offerMap = {};

                          data.forEach(store => {
                            if (store.offers != null) {
                              store.offers.forEach(offer => {
                                if (offerMap[offer.offerId] == null) {
                                  offerMap[offer.offerId] = offers.length;
                                  
                                  offer.locations = [];
  
                                  offer.locations.push({
                                    merchantName: store.merchantName,
                                    address: store.address.streetAddress1,
                                    waitTime: Math.round(store.waitTime / 60),
                                    distance: store.distance,
                                    position: {
                                      lat: store.location.lat,
                                      lng: store.location.lon
                                    }
                                  })
  
                                  offers.push(offer);
                                } else {
                                  offers[offerMap[offer.offerId]].locations.push({
                                    merchantName: store.merchantName,
                                    address: store.address.streetAddress1,
                                    waitTime: Math.round(store.waitTime / 60),
                                    distance: store.distance,
                                    position: {
                                      lat: store.location.lat,
                                      lng: store.location.lon
                                    }
                                  });
                                }
                              })  
                            }
                          });

                          offers.forEach(offer => {
                            offer.locations.sort((a, b) => {
                              return a.waitTime > b.waitTime;
                            });
                          })
                          
                          return offers;
                        })
                        .catch(this.handleError);
      }
  
  private extractData(res: any) {
    let body = res.json();
    return body || { };
  }
  
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
