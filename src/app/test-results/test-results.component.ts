import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestResultResponse } from '../services/test/test-result-response';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})
export class TestResultsComponent implements OnInit {

  score: number;
  testName: string;
  username: string;
  totalQuestions: number;
  timeSpent: string;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as any;
    this.score = state?.score ?? 0;
    this.testName = state?.testName ?? '';
    this.username = state?.username ?? '';
    this.totalQuestions = state?.totalQuestions ?? 0;

    const startTime = new Date(state?.startTime);
    const endTime = new Date(state?.endTime);
    this.timeSpent = this.calculateTimeSpent(startTime, endTime);
  }

  ngOnInit(): void {}

  getPercentage(): number {
    return this.totalQuestions ? (this.score / this.totalQuestions) * 100 : 0;
  }

  calculateTimeSpent(startTime: Date, endTime: Date): string {
    const timeDiff = endTime.getTime() - startTime.getTime();
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return `${minutes} minutes and ${seconds} seconds`;
  }
}
