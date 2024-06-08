import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {TestResultResponse} from "../services/test/test-result-response";

@Component({
  selector: 'app-module-test-result',
  templateUrl: './module-test-result.component.html',
  styleUrl: './module-test-result.component.css'
})
export class ModuleTestResultComponent {
  score: number;
  testName: string;
  username: string;
  totalQuestions: number;
  courseId: any;


  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as TestResultResponse & { courseId: number };
    this.score = state?.score ?? 0;
    this.testName = state?.testName ?? '';
    this.username = state?.username ?? '';
    this.totalQuestions = state?.totalQuestions ?? 0;
    this.courseId = this.router.getCurrentNavigation().extras.state['courseId'];
  }

  ngOnInit(): void {
  }

  getPercentage(): number {
    return this.totalQuestions ? (this.score / this.totalQuestions) * 100 : 0;
  }

  goBackToCourse(): void {
    if (this.courseId) {
      this.router.navigate(['/myCourse', this.courseId.courseId]);
    } else {
      console.error('No course ID provided');
    }
  }
}
