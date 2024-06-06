import { Component, OnInit } from '@angular/core';
import { CourseDTO } from '../services/course/courseDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course/course.service';
import { LessonDTO } from '../services/course/lessonDTO';
import { ModuleTestDTO } from '../services/course/module_testDTO';
import { ModuleTestSubmissionDTO } from '../services/course/module_test_submissionDTO';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-my-course-details',
  templateUrl: './my-course-details.component.html',
  styleUrls: ['./my-course-details.component.css']
})
export class MyCourseDetailsComponent implements OnInit {
  courseId: number;
  menuHidden = true;
  course: CourseDTO | null = null;
  selectedModule: any;
  currentUserId: number | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.courseId = this.route.snapshot.params['id'];
    this.currentUserId = this.authService.getCurrentUserId(); // Получение текущего userId из сервиса аутентификации
  }

  ngOnInit(): void {
    this.getCourseDetails(this.courseId);
  }

  getCourseDetails(courseId: number): void {
    this.courseService.getCourseById(courseId).subscribe(
      (course: CourseDTO) => {
        this.course = course;
        this.checkIfAllTestsPassed();
        if (this.course && this.course.modules.length > 0) {
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

  testPassed(submissions: ModuleTestSubmissionDTO[] | undefined, userId: number | null): boolean {
    return submissions?.some(submission => submission.user.id === userId && submission.passed) || false;
  }

  selectModule(module: any): void {
    this.selectedModule = module;
  }

  onLessonClick(lesson: LessonDTO): void {
    this.router.navigate(['/presentation', lesson.fileKey]);
  }

  onTestClick(moduleTest: ModuleTestDTO | undefined): void {
    if (moduleTest) {
      this.router.navigate(['/module-test', moduleTest.id], {
        state: { courseId: this.courseId }
      });
    }
  }

  checkIfAllTestsPassed(): void {
    const allTestsPassed = this.course?.modules.every(module =>
      module.moduleTest?.submissions.some(submission => submission.user.id === this.currentUserId && submission.passed)
    ) || false;

    if (allTestsPassed) {
      this.toastr.success('Поздравляем! Вы успешно сдали все тесты курса.', 'Курс успешно завершен!');
    }
  }
}
