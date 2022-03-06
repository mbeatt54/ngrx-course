import { Course, compareCourses } from '../model/course';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { CourseActions } from '../action.types';
import { allCoursesLoaded } from '../course.actions';

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
  selectId: (course) => course.id,
});
export const initialCoursesState = adapter.getInitialState({ allCoursesLoaded: false });

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded, (state, action) => {
    return adapter.addAll(action.courses, { ...state, allCoursesLoaded: true });
  }),
  on(CourseActions.courseUpdated, (state, action) => adapter.updateOne(action.update, state))
);

export const { selectAll } = adapter.getSelectors();
