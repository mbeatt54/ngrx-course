import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';

import { AppState } from '../reducers';
import { CourseActions } from './action-types';
import { CoursesHttpService } from './services/courses-http.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class CoursesEffects {
  loadCourses = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadAllCourses),
      concatMap(() => this.coursesService.findAllCourses()),
      map((courses) => CourseActions.allCoursesLoaded({ courses }))
    )
  );

  saveCourse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CourseActions.courseUpdated),
        concatMap((action) => this.coursesService.saveCourse(action.update.id, action.update.changes))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private coursesService: CoursesHttpService) {}
}
