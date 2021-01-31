import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {

  currentId: number;

  constructor() {
    this.currentId = Math.floor(
      Math.random() * 10000
    );
  }

  /**
   * Return a unique id
   */
  public getId(): number {
    this.currentId += 1;

    return  this.currentId;
  }
}
