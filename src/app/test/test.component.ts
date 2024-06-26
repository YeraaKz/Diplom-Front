import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { TestService } from '../services/test/test.service';
import { ToastrService } from 'ngx-toastr';
import { TestResultResponse } from '../services/test/test-result-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  testForm: FormGroup;
  test: any;
  isLoading = false;
  hasStarted = false;
  startTime: Date;
  endTime: Date;

  constructor(private fb: FormBuilder, private testService: TestService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.testForm = this.fb.group({
      testId: [1], // Идентификатор теста, который нужно загрузить
      questions: this.fb.array([]) // Инициализация FormArray для вопросов
    });
  }

  startTest(): void {
    this.hasStarted = true;
    this.startTime = new Date(); // Устанавливаем время начала теста
    this.loadTest(1); // Загрузить тест с id = 1
  }

  loadTest(testId: number): void {
    this.isLoading = true;
    this.testService.getTest(testId).subscribe(test => {
      this.test = test;
      this.shuffleQuestions(this.test.questions); // Перемешать вопросы
      const questionControls = this.test.questions.map(question => this.fb.group({
        questionId: [question.id],
        selectedOption: [null]
      }));
      this.testForm.setControl('questions', this.fb.array(questionControls));
      this.isLoading = false;
    });
  }

  shuffleQuestions(questions: any[]): void {
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
  }

  get questions(): FormArray {
    return this.testForm.get('questions') as FormArray;
  }

  onSubmit(): void {
    this.endTime = new Date(); // Устанавливаем время окончания теста
    const submission = {
      testId: this.testForm.value.testId,
      answers: this.testForm.value.questions.map((q: any) => ({
        questionId: q.questionId,
        selectedOptionId: q.selectedOption
      }))
    };

    this.isLoading = true;
    this.testService.submitTest(submission).subscribe(
      (response: TestResultResponse) => {
        this.isLoading = false;
        this.toastr.success('Вы сдали тест', 'Тестирование сдано успешно');
        this.router.navigate(['/test-results'], {
          state: {
            score: response.score,
            testName: response.testName,
            username: response.username,
            totalQuestions: this.test.questions.length,
            startTime: this.startTime,
            endTime: this.endTime
          }
        });
      },
      error => {
        console.error(error);
        this.isLoading = false;
        this.toastr.error('Пожалуйста ответьте на все вопросы', 'Ошибка');
      }
    );
  }
}
