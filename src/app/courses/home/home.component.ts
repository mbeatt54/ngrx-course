import { Component, OnInit } from '@angular/core';
import { Course, compareCourses } from '../model/course';
import { Store, select } from '@ngrx/store';
import { map, shareReplay } from 'rxjs/operators';
import { selectAdvancedCourses, selectBeginnerCourses, selectPromoTotal } from '../courses.selectors';

import { AppState } from '../../reducers';
import { CoursesHttpService } from '../services/courses-http.service';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { defaultDialogConfig } from '../shared/default-dialog-config';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number>;
  loading$: Observable<boolean>;
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(private dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));
    this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));
    this.promoTotal$ = this.store.pipe(select(selectPromoTotal));
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create',
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
