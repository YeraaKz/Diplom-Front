import { Component } from '@angular/core';
import {CourseDTO} from "../services/course/courseDTO";
import {CourseModuleDTO} from "../services/course/course_moduleDTO";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../services/course/course.service";

@Component({
  selector: 'app-admin-course-details',
  templateUrl: './admin-course-details.component.html',
  styleUrl: './admin-course-details.component.css'
})
export class AdminCourseDetailsComponent {
  course: CourseDTO | undefined;
  newModule: CourseModuleDTO = { id: 0, title: '', lessons: [], moduleTest: null };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.loadCourse();
  }

  loadCourse() {
    const courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    if (courseId) {
      this.courseService.getCourseById(courseId).subscribe(
        data => {
          this.course = data;
        },
        error => {
          console.error('Error loading course:', error);
        }
      );
    } else {
      console.error('Invalid course ID');
    }
  }

  addModule() {
    if (this.course) {
      this.courseService.addModule(this.course.id, this.newModule).subscribe(
        module => {
          if (this.course) {
            this.course.modules.push(module);
            this.clearNewModule();
          }
        },
        error => {
          console.error('Error adding module:', error);
        }
      );
    }
  }

  viewModuleDetails(moduleId: number) {
    const courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    this.router.navigate([`/admin/courses/${courseId}/modules/${moduleId}`])
      .then(success => {
        if (success) {
          console.log('Navigation successful');
        } else {
          console.error('Navigation has failed');
        }
      })
      .catch(err => {
        console.error('Navigation error:', err);
      });
  }


  clearNewModule() {
    this.newModule = { id: 0, title: '', lessons: [], moduleTest: null };
  }
}
