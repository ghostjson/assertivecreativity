import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class CommonService {
  isloading: boolean = true;
  loaderCount: number = 0;

  private loaderSource = new BehaviorSubject<boolean>(true);
  loader = this.loaderSource.asObservable();

  constructor() {}

  featuredProduct(): any {
    return {
      title: "Today's Offer",
      slides: [
        {
          image: "https://via.placeholder.com/200x200.png",
          url: "",
        },
        {
          image: "https://via.placeholder.com/200x200.png",
          url: "",
        },
        {
          image: "https://via.placeholder.com/200x200.png",
          url: "",
        },
        {
          image: "https://via.placeholder.com/200x200.png",
          url: "",
        },
        {
          image: "https://via.placeholder.com/200x200.png",
          url: "",
        },
        {
          image: "https://via.placeholder.com/200x200.png",
          url: "",
        },
        {
          image: "https://via.placeholder.com/200x200.png",
          url: "",
        },
      ],
    };
  }

  /**
   * Show or hide page loading animation
   * @param status loader status
   */
  setLoader(status: boolean) {
    if(status) {
      this.loaderCount += 1;
      this.loaderSource.next(true);
      console.log('setting loader to ', status);
    }
    else {
      // reduce loaderCount only if loader was set to true before 
      if(this.loaderCount > 0) {
        this.loaderCount -= 1;
      }

      if(this.loaderCount === 0) {
        this.loaderSource.next(status);
        console.log('setting loader to ', status);
      }
    }
    console.log(this.loaderCount);
  }

  /**
   * Loader state handler for observables
   * @param sub subscription to the observable that triggered the loader
   */
  setLoaderFor(sub: Subscription) {
    console.log('set loader from wrapper');
    this.setLoader(true);
    sub.add(() => {
      this.setLoader(false);
    });
  }
}
