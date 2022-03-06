import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { filter, finalize, first, tap } from 'rxjs/operators';

import { AppState } from '../reducers';
import { Injectable } from '@angular/core';
import { areCoursesLoaded } from './courses.selectors';
import { loadAllCourses } from './course.actions';

@Injectable({
  providedIn: 'root',
})
export class CoursesResolver implements Resolve<any> {
  loading = false;
  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.pipe(
      select(areCoursesLoaded),
      tap((coursedLoaded) => {
        console.log('router resolver', this.loading);
        if (!this.loading && !coursedLoaded) {
          this.loading = true;
          this.store.dispatch(loadAllCourses());
        }
      }),
      filter((coursesLoaded) => coursesLoaded),
      first(),
      finalize(() => {
        this.loading = false;
      })
    );
  }
}
