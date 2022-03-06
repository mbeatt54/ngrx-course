import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';

import { CourseActions } from './action.types';
import { CoursesHttpService } from './services/courses-http.service';
import { Injectable } from '@angular/core';
import { Update } from '@ngrx/entity';
import { allCoursesLoaded } from './course.actions';
import { dispatch } from 'rxjs/internal/observable/pairs';

@Injectable({ providedIn: 'root' })
export class CoursesEffects {
  constructor(private actions$: Actions, private coursesHttpService: CoursesHttpService) {}

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      tap(() => console.log('loadCourses$')),
      ofType(CourseActions.loadAllCourses),
      concatMap((action) => this.coursesHttpService.findAllCourses()),
      map((courses) => {
        console.log('map', courses);
        return allCoursesLoaded({ courses });
      })
    )
  );

  saveCourse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CourseActions.courseUpdated),
        concatMap((action) => this.coursesHttpService.saveCourse(action.update.id, action.update.changes))
      ),
    { dispatch: false }
  );
}
