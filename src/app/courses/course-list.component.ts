import { Component, OnInit } from '@angular/core';
import { Course } from './Course';
import { CourseService } from './course.service';

@Component({
  templateUrl: './course-list.component.html',
})
export class CourseListComponent implements OnInit {
  constructor(private courseService: CourseService) {}

  _courses: Course[] = [];
  _filterBy: string = '';
  filteredCourses: Course[] = [];

  ngOnInit(): void {
    this.retrieveAll();
  }

  retrieveAll() {
    this.courseService.retrieveAll().subscribe({
      next: courses => {
        this._courses = courses
        this.filteredCourses = this._courses;
      },

      error: err => console.log('Error ', err)
    });
  }

  deleteById(courseId: number): void {
    this.courseService.deleteById(courseId).subscribe({
      next: () => {
        console.log('Deleted with success!');
        this.retrieveAll();
      },

      error: err => console.log('Error, ', err)
    })
  }

  set filter(value: string) {
    this._filterBy = value;
    this.filteredCourses = this._courses.filter(
      (course: Course) =>
        (course.name?.toLowerCase().indexOf(this._filterBy.toLowerCase()) ?? -1) > -1
    );
  }

  get filter() {
    return this._filterBy;
  }
}
