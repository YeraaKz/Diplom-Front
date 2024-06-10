import { Component, OnInit } from '@angular/core';
import { CourseDTO } from '../services/course/courseDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course/course.service';
import { LessonDTO } from '../services/course/lessonDTO';
import { ModuleTestDTO } from '../services/course/module_testDTO';
import { ModuleTestSubmissionDTO } from '../services/course/module_test_submissionDTO';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";

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
  courseCompleted: boolean = false;
  certificateGenerated: boolean = false;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private toastr: ToastrService,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.courseId = this.route.snapshot.params['id'];
    this.currentUserId = this.authService.getCurrentUserId(); // Получение текущего userId из сервиса аутентификации
  }

  ngOnInit(): void {
    this.getCourseDetails(this.courseId);
  }

  getCourseDetails(courseId: number): void {
    this.isLoading=true;
    this.courseService.getCourseById(courseId).subscribe(
      (course: CourseDTO) => {
        this.course = course;
        this.checkIfAllTestsPassed();
        if (this.course && this.course.modules.length > 0) {
          this.selectedModule = this.course.modules[0];
        }
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.toastr.error('Error fetching course details:', error);
      }
    );
  }

  toggleMenu(): void {
    this.menuHidden = !this.menuHidden;
  }

  testPassed(submissions: ModuleTestSubmissionDTO[], userId: number | null): boolean {
    return submissions?.some(submission => submission.user.id === userId && submission.passed) || false;
  }

  selectModule(module: any): void {
    this.selectedModule = module;
  }

  onLessonClick(lesson: LessonDTO) {
    this.router.navigate(['/presentation', lesson.fileKey]);
  }

  onTestClick(moduleTest: ModuleTestDTO): void {
    this.router.navigate(['/module-test', moduleTest.id], {
      state: { courseId: this.courseId }
    });
  }

  checkIfAllTestsPassed(): void {
    const allTestsPassed = this.course?.modules.every(module =>
      module.moduleTest?.submissions.some(submission => submission.user.id === this.currentUserId && submission.passed)
    ) || false;

    if (allTestsPassed) {
      this.courseCompleted = true;
      this.toastr.success('Поздравляем! Вы успешно сдали все тесты курса.', 'Курс успешно завершен!');
    }
  }

  downloadCertificate(): void {
    const url = environment.qrUrl;
    const body = {
      courseId: this.courseId,
      params: [
        {
          "COURSE_TITLE": this.course?.name || 'Курс'
        }
      ]
    };
    this.http.post(url, body, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'certificate.pdf';
      a.click();
      URL.revokeObjectURL(objectUrl);
    }, error => {
      console.error('Error downloading certificate:', error);
    });
  }
}
