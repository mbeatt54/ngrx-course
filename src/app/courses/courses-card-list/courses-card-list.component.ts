import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Course } from '../model/course';
import { CourseEntityService } from '../services/course-entity.service';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { defaultDialogConfig } from '../shared/default-dialog-config';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesCardListComponent implements OnInit {
  @Input()
  courses: Course[];

  @Output()
  courseChanged = new EventEmitter();

  constructor(private dialog: MatDialog, private coursesService: CourseEntityService) {}

  ngOnInit() {}

  editCourse(course: Course) {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Edit Course',
      course,
      mode: 'update',
    };

    this.dialog
      .open(EditCourseDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.courseChanged.emit());
  }

  onDeleteCourse(course: Course) {
    this.coursesService.delete(course);
  }
}
