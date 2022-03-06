import { createAction, props } from '@ngrx/store';

import { Course } from './model/course';
import { Update } from '@ngrx/entity';

export const loadAllCourses = createAction('[Courses Resolver] Load All Courses');

export const courseUpdated = createAction('[Edit Course Diaqlog] Course Updated', props<{ update: Update<Course> }>());

export const allCoursesLoaded = createAction(
  '[Load Courses Effect] All Courses loaded',
  props<{ courses: Course[] }>()
);
