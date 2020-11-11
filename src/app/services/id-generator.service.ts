import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {

  currentId: number;

  constructor() {
    this.currentId = 1;
  }

  /**
   * Return a unique id
   */
  public getId(): number {
    ++this.currentId;

    return  this.currentId;
  }
}
