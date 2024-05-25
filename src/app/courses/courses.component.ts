import { Component } from '@angular/core';
import {CourseDTO} from "../services/course/courseDTO";
import {CourseService} from "../services/course/course.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  public coursesList: CourseDTO[] = [];
  public filteredCoursesList: CourseDTO[] = [];
  searchTerm = '';
  activeLanguage = 'Все';

  constructor(private courseService: CourseService) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getAllCourses().subscribe(
      (courses: CourseDTO[]) => {
        this.coursesList = courses;
        this.filteredCoursesList = courses;
      },
      (error) => {
        alert(error.message);
      }
    );
  }
  filterCoursesByLanguage(language: string): void {
    this.activeLanguage = language;
    this.filteredCoursesList = this.coursesList.filter(course => language === 'Все' ? true : course.language === language);
  }

  // tslint:disable-next-line:typedef
  onSearchCourse(): void {
    if (!this.searchTerm) {
      this.filteredCoursesList = [...this.coursesList];
    } else {
      this.courseService.searchCourses(this.searchTerm).subscribe({
        next: (data: CourseDTO[]) => {
          this.filteredCoursesList = data;
        },
        error: (error) => this.handleError(error)
      });
    }
  }

  private handleError(error: any): void {
    console.error('Request failed:', error);
    alert(`Error: ${error.message || 'Unknown error'}`);
  }
}
