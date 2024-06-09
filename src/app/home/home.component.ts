import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ContactDTO } from '../services/contact/contactDTO';
import { CourseDTO } from '../services/course/courseDTO';
import { CourseService } from '../services/course/course.service';
import { ContactService } from '../services/contact/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: any = {};
  contactInfo: ContactDTO;
  courses$: Observable<CourseDTO[]>;
  filteredCourses$: Observable<CourseDTO[]>;
  activeCategory: string = 'С нуля';
  public isLoading: boolean = true;

  constructor(private courseService: CourseService, private contactService: ContactService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.courses$ = this.courseService.getAllCourses();
    this.filteredCourses$ = this.courses$;
    this.isLoading=false;
  }

  contactUs(): void {
    this.isLoading=true;
    this.contactInfo = new ContactDTO(
      this.form.firstName,
      this.form.firstName,
      this.form.firstName + '@gmail.com',
      this.form.phones,
      'Default way to contact'
    );

    this.contactService.saveContact(this.contactInfo).subscribe({
      next: (response) => {
        this.isLoading=false;
        this.toastr.success(`Вы успешно отправили запрос`, 'Успешно отправлено');
      },
      error: (error) => {
        this.isLoading=false;
        this.toastr.error(`Ошибка отправки: ${error.message || 'Неизвестная ошибка'}`, 'Ошибка');
      }
    });
  }

  filterCoursesByCategory(category: string): void {
    this.activeCategory = category;
    this.filteredCourses$ = this.courses$.pipe(
      map(courses => courses.filter(course =>
        category === 'Все курсы' ? true : course.level === category
      ))
    );
  }
}
