import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdGeneratorService {
  currentId: number;

  constructor() {
    let random: string = '';

    for(let i = 0; i < 10; i += 1) {
      random += String(Math.floor(Math.random() * 10));
    }
    this.currentId = Number(random);
  }

  /**
   * Return a unique id
   */
  public getId(): number {
    this.currentId += 1;

    return this.currentId;
  }
}
