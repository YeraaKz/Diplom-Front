import { Component, OnInit } from '@angular/core';
import {CourseDTO} from '../services/course/courseDTO';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../services/course/course.service';
import {LessonDTO} from "../services/course/lessonDTO";

@Component({
  selector: 'app-my-course-details',
  templateUrl: './my-course-details.component.html',
  styleUrls: ['./my-course-details.component.css']
})
export class MyCourseDetailsComponent implements OnInit {
  courseId: number;
  menuHidden = true;
  course: CourseDTO;
  selectedModule: any;

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService) {
    this.courseId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getCourseDetails(this.courseId);
  }

  getCourseDetails(courseId: number): void {
    this.courseService.getCourseById(courseId).subscribe(
      (course: CourseDTO) => {
        this.course = course;
        if (this.course.modules.length > 0) {
          this.selectedModule = this.course.modules[0];
        }
      },
      (error) => {
        console.error('Error fetching course details:', error);
      }
    );
  }


  toggleMenu(): void {
    this.menuHidden = !this.menuHidden;
  }

  selectModule(module: any): void {
    this.selectedModule = module;
  }

  onLessonClick(lesson: LessonDTO) {
    this.router.navigate(['/presentation', lesson.fileKey])
  }
}
