import { Component } from '@angular/core';
import {CourseModuleDTO} from "../services/course/course_moduleDTO";
import {LessonDTO} from "../services/course/lessonDTO";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../services/course/course.service";
import {ModuleTestDTO} from "../services/course/module_testDTO";

@Component({
  selector: 'app-admin-module-details',
  templateUrl: './admin-module-details.component.html',
  styleUrl: './admin-module-details.component.css'
})
export class AdminModuleDetailsComponent {
  module: CourseModuleDTO | undefined;
  newLesson: LessonDTO = { id: 0, title: '', contentType: 'presentation', fileKey: '' };
  newModuleTest: ModuleTestDTO = { id: 0, testName: '', questions: [], submissions: []};
  selectedFile: File | null = null;


  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadModule();
  }

  loadModule() {
    const moduleId = Number(this.route.snapshot.paramMap.get('moduleId'));
    const courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    if (courseId && moduleId) {
      this.courseService.getCourseById(courseId).subscribe(
        data => {
          this.module = data.modules.find(m => m.id === moduleId);
        },
        error => {
          console.error('Error loading module:', error);
        }
      );
    } else {
      console.error('Invalid module ID');
    }
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addLesson() {
    const courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    const moduleId = Number(this.route.snapshot.paramMap.get('moduleId'));
    if (this.selectedFile && courseId && moduleId) {
      this.courseService.addLesson(courseId, moduleId, this.newLesson.title, this.selectedFile).subscribe(
        lesson => {
          if (this.module) {
            this.module.lessons.push(lesson);
            this.clearNewLesson();
          }
        },
        error => {
          console.error('Error adding lesson:', error);
        }
      );
    }
  }

  clearNewLesson() {
    this.newLesson = { id: 0, title: '', contentType: 'presentation', fileKey: '' };
  }

  addModuleTest() {
    const moduleId = Number(this.route.snapshot.paramMap.get('moduleId'));
    if (this.module && moduleId) {
      this.courseService.addModuleTest(moduleId, this.newModuleTest).subscribe(
        moduleTest => {
          if (this.module) {
            this.module.moduleTest = moduleTest;
            this.clearNewModuleTest();
          }
        },
        error => {
          console.error('Error adding module test:', error);
        }
      );
    }
  }

  clearNewModuleTest() {
    this.newModuleTest = { id: 0, testName: '', questions: [], submissions: [] };
  }

  viewTestDetails(testId: number) {
    const courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    const moduleId = Number(this.route.snapshot.paramMap.get('moduleId'));
    this.router.navigate([`/admin/courses/${courseId}/modules/${moduleId}/tests/${testId}`]);
  }
}
