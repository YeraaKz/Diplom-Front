import { Component, OnInit } from '@angular/core';
import { CourseDTO } from '../services/course/courseDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course/course.service';
import { LessonDTO } from '../services/course/lessonDTO';
import {ModuleTestDTO} from "../services/course/module_testDTO";
import {ModuleTestSubmissionDTO} from "../services/course/module_test_submissionDTO";
import {ToastrService} from "ngx-toastr";

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private toastr: ToastrService) {

    this.courseId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getCourseDetails(this.courseId);
  }

  getCourseDetails(courseId: number): void {
    this.courseService.getCourseById(courseId).subscribe(
      (course: CourseDTO) => {
        this.course = course;
        this.checkIfAllTestsPassed();
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

  testPassed(submissions: ModuleTestSubmissionDTO[]): boolean {
    return submissions.some(submission => submission.passed);
  }

  selectModule(module: any): void {
    this.selectedModule = module;
  }

  onLessonClick(lesson: LessonDTO) {
    this.router.navigate(['/presentation', lesson.fileKey]);
  }

  onTestClick(moduleTest: ModuleTestDTO): void {
    console.log(this.courseId)
    this.router.navigate(['/module-test', moduleTest.id], {
      state: { courseId: this.courseId }
    });
  }

  checkIfAllTestsPassed(): void {
    const allTestsPassed = this.course.modules.every(module =>
      module.moduleTest.submissions.some(submission => submission.passed)
    );

    if (allTestsPassed) {
      this.toastr.success('Поздравляем! Вы успешно сдали все тесты курса.', 'Курс успешно завершен!');
    }
  }

}
