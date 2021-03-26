import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

/**
 * The state management class is based on a dev.to post. So check out that post
 * for details on how it is used. It is almost like redux.
 * https://dev.to/angular/simple-yet-powerful-state-management-in-angular-with-rxjs-4f8g
 */
export class StateService<T> {
  private state$: BehaviorSubject<T>;
  protected get state(): T {
    return this.state$.getValue();
  }

  constructor(initialState: T) {
    this.state$ = new BehaviorSubject<T>(initialState);
  }

  /**
   * select a particular data from the state
   * @param mapFn map function to select the state
   */
  protected select<K>(mapFn: (state: T) => K): Observable<K> {
    return this.state$.asObservable().pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged()
    );
  }

  /**
   * update the current state
   * @param newState new state
   */
  protected setState(newState: Partial<T>) {
    this.state$.next({
      ...this.state,
      ...newState,
    });
    console.log('state updated: ', this.state);
  }
}
