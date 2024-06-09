import {Component, OnInit} from '@angular/core';
import {CourseDTO} from "../services/course/courseDTO";
import {CourseService} from "../services/course/course.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-course',
  templateUrl: './admin-course.component.html',
  styleUrl: './admin-course.component.css'
})
export class AdminCourseComponent implements OnInit {
  courses: CourseDTO[] = [];
  newCourse: CourseDTO = {
    id: 0,
    name: '',
    description: '',
    level: 'Для начинающих',
    language: 'Казахский',
    imageKey: '',
    durationInMonths: '',
    dateCreated: new Date(),
    modules: [],
    skills: []
  };

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getAllCourses().subscribe(data => {
      this.courses = data;
    });
  }

  createCourse() {
    this.courseService.createCourse(this.newCourse).subscribe(() => {
      this.loadCourses();
      this.clearNewCourse();
    });
  }

  clearNewCourse() {
    this.newCourse = {
      id: 0,
      name: '',
      description: '',
      level: 'Для начинающих',
      language: 'Казахский',
      imageKey: '',
      durationInMonths: '',
      dateCreated: new Date(),
      modules: [],
      skills: []
    };
  }

  viewCourseDetails(courseId: number) {
    this.router.navigate(['/admin/courses', courseId])
      .then(success => {
        if (success) {
          console.log('Navigation is successful!');
        } else {
          console.log('Navigation has failed!');
        }
      });
  }
}
