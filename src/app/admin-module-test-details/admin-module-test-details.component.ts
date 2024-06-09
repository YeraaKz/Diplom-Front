import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ModuleTestDTO} from "../services/course/module_testDTO";
import {ModuleTestQuestionDTO} from "../services/course/module_test_questionDTO";
import {ModuleTestQuestionOptionDTO} from "../services/course/module_test_question_optionDTO";
import {CourseDTO} from "../services/course/courseDTO";
import {CourseService} from "../services/course/course.service";

@Component({
  selector: 'app-admin-module-test-details',
  templateUrl: './admin-module-test-details.component.html',
  styleUrls: ['./admin-module-test-details.component.css']
})
export class AdminModuleTestDetailsComponent implements OnInit {
  moduleTest: ModuleTestDTO | undefined;
  newQuestion: ModuleTestQuestionDTO = { id: 0, questionText: '', options: [] };
  newOption: ModuleTestQuestionOptionDTO = { id: 0, optionText: '', isCorrect: false };
  selectedQuestionId: number | undefined;
  course: CourseDTO | undefined;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.loadModuleTest();
  }

  loadModuleTest() {
    const courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    const moduleId = Number(this.route.snapshot.paramMap.get('moduleId'));
    if (courseId && moduleId) {
      this.courseService.getCourseById(courseId).subscribe(
        data => {
          this.course = data;
          const module = this.course.modules.find(m => m.id === moduleId);
          if (module) {
            this.moduleTest = module.moduleTest;
          } else {
            console.error('Module not found');
          }
        },
        error => {
          console.error('Error loading course:', error);
        }
      );
    } else {
      console.error('Invalid course or module ID');
    }
  }

  addQuestion() {
    const moduleId = Number(this.route.snapshot.paramMap.get('moduleId'));
    if (moduleId && this.moduleTest) {
      this.courseService.addQuestion(moduleId, this.newQuestion).subscribe(
        question => {
          if (this.moduleTest) {
            this.moduleTest.questions.push(question);
            this.clearNewQuestion();
          }
        },
        error => {
          console.error('Error adding question:', error);
        }
      );
    }
  }

  addOption() {
    const moduleId = Number(this.route.snapshot.paramMap.get('moduleId'));
    if (moduleId && this.moduleTest && this.selectedQuestionId) {
      this.courseService.addOption(moduleId, this.selectedQuestionId, this.newOption).subscribe(
        option => {
          const question = this.moduleTest.questions.find(q => q.id === this.selectedQuestionId);
          if (question) {
            question.options.push(option);
            this.clearNewOption();
          }
        },
        error => {
          console.error('Error adding option:', error);
        }
      );
      window.location.reload();
    }
  }

  selectQuestion(questionId: number) {
    this.selectedQuestionId = questionId;
  }

  clearNewQuestion() {
    this.newQuestion = { id: 0, questionText: '', options: [] };
  }

  clearNewOption() {
    this.newOption = { id: 0, optionText: '', isCorrect: false };
  }
}
