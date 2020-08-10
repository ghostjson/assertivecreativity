import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class CommonService {
  isloading: boolean = true;

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

  setLoader(status: boolean) {
    this.loaderSource.next(status);
  }

}
