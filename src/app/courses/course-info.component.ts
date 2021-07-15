import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "./Course";
import { CourseService } from "./course.service";

@Component({
  templateUrl: './course-info.component.html'
})
export class CourseInfoComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService
    ) { };

  course!: Course;

  ngOnInit(): void {
    this.courseService.retrieveById(Number.parseInt(this.activatedRoute.snapshot.paramMap.get('id') ?? '')).subscribe({
      next: course => this.course = course,
      error: err => console.log('Error', err)
    });
  }

  save(): void {
    this.courseService.save(this.course).subscribe({
      next: course => this.course = course,
      error: err => console.log('Error, ', err)
    });
  }
}
