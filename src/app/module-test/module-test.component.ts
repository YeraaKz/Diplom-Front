import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ModuleTestService} from "../services/module-test/module-test.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-module-test',
  templateUrl: './module-test.component.html',
  styleUrl: './module-test.component.css'
})
export class ModuleTestComponent {
  test: any;
  answers: { [key: number]: number } = {};
  score: number | null = null;
  courseId: any;
  public isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private moduleTestService: ModuleTestService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.courseId = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    if (id) {
      this.moduleTestService.getModuleTest(id).subscribe(test => {
        this.test = test;
      });
    }
  }

  selectAnswer(questionId: number, optionId: number): void {
    this.answers[questionId] = optionId;
  }

  submitTest(): void {
    console.log(this.courseId); // вот здесь выводит null
    const submission = {
      score: Object.keys(this.answers).reduce((score, questionId) => {
        const question = this.test.questions.find(q => q.id === +questionId);
        const option = question.options.find(o => o.id === this.answers[questionId]);
        return score + (option.isCorrect ? 1 : 0);
      }, 0),
      totalQuestions: this.test.questions.length
    };
    this.isLoading = true;
    this.moduleTestService.submitTestResults(this.test.id, submission).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastr.success('Вы сдали тест', 'Тестирование сдано успешно');
        this.router.navigate(['/module-test-result'], {
          state: {
            score: submission.score,
            testName: this.test.testName,
            username: this.test.username,
            totalQuestions: submission.totalQuestions,
            courseId: this.courseId
          }
        })
      },
      error: (error) => console.error('Error submitting test result', error)
    });
  }

}
