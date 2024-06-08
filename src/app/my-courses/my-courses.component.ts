// my-courses.component.ts
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course/course.service';
import { ToastrService } from 'ngx-toastr';
import {CourseDTO} from "../services/course/courseDTO";
import {CourseModuleDTO} from "../services/course/course_moduleDTO";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  public coursesList: {
    durationInMonths: string;
    dateCreated: Date;
    level: string;
    imageKey: string;
    name: string;
    description: string;
    language: string;
    id: number;
    modules: CourseModuleDTO[];
    totalTests: number;
    passedTests: number;

  }[] = [];

  isLoading: boolean = false;

  private currentUserId: number | null;

  constructor(private courseService: CourseService,
              private toastr: ToastrService,
              private authService: AuthService) {
    this.currentUserId = this.authService.getCurrentUserId(); // Получение текущего userId
  }

  ngOnInit(): void {
    this.getMyCourses();
  }

  getMyCourses(): void {
    this.isLoading =  true;
    this.courseService.getMyCourses().subscribe(
      (courses: CourseDTO[]) => {
        this.coursesList = courses.map(course => this.calculateTestProgress(course));
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching courses:', error);
        this.isLoading = false;
      }
    );
  }

  calculateTestProgress(course: CourseDTO): {
    passedTests: number;
    durationInMonths: string;
    dateCreated: Date;
    level: string;
    imageKey: string;
    name: string;
    description: string;
    language: string;
    id: number;
    modules: CourseModuleDTO[];
    totalTests: number
  } {
    let totalTests = 0;
    let passedTests = 0;

    course.modules.forEach(module => {
      if (module.moduleTest && module.moduleTest.submissions) {
        totalTests += 1; // Подсчитываем каждый тест
        // Проверяем, существует ли успешная сдача теста текущим пользователем
        if (module.moduleTest.submissions.some(submission => submission.user.id === this.currentUserId && submission.passed)) {
          passedTests += 1;
        }
      }
    });

    return {
      ...course,
      totalTests,
      passedTests
    };
  }
}
