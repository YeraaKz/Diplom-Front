import { Component, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {CourseDTO} from '../services/course/courseDTO';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../services/course/course.service';
import {TokenStorageService} from '../services/token/token-storage.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  info: any = {};
  course$: Observable<CourseDTO>;
  authority: boolean = false;
  courseId: number;
  public isLoading: boolean = true;
  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService
  ) {}
  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.courseId = +this.route.snapshot.params['id'];
    this.course$ = this.courseService.getCourseById(this.courseId);
    this.subscriptions.add(this.tokenStorage.getToken().subscribe(token => {
      this.info.token = token;
    }));

    if (this.info.token) {
      this.authority  = true;
    }

    console.log(this.courseService.getCourseById(this.courseId));
    this.isLoading = false;
  }

  enrollInCourse(id: number): void {
    this.isLoading = true;
    this.courseService.enrollUserInCourse(id).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.toastr.success(`Вы успешно зарегистрированы на курс:`, 'Регистрация успешна');
      },
      error: (error) => {
        if (error.status === 409) {
          this.toastr.warning('Вы уже зарегистрированы на этот курс.', 'Уже зарегистрирован');
        } else {
          this.toastr.error(`Ошибка регистрации: ${error.message || 'Неизвестная ошибка'}`, 'Ошибка');
        }
        this.isLoading = false;
      }
    });
  }
}
