import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseDTO } from './courseDTO';
import {environment} from "../../../environments/environment";
import {CourseModuleDTO} from "./course_moduleDTO";
import {LessonDTO} from "./lessonDTO";
import {ModuleTestDTO} from "./module_testDTO";
import {ModuleTestQuestionDTO} from "./module_test_questionDTO";
import {ModuleTestQuestionOptionDTO} from "./module_test_question_optionDTO";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = environment.courses_baseUrl;

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<CourseDTO[]> {
    return this.http.get<CourseDTO[]>(`${this.baseUrl}/all`);
  }

  getMyCourses(): Observable<CourseDTO[]> {
    return this.http.get<CourseDTO[]>(`${this.baseUrl}/myCourses`);
  }

  getCourseById(id: number): Observable<CourseDTO> {
    return this.http.get<CourseDTO>(`${this.baseUrl}/${id}`);
  }

  enrollUserInCourse(id: number): Observable<string> {
    return this.http.post(`${this.baseUrl}/${id}/enroll`, {}, { responseType: 'text' });
  }

  saveCourse(course: CourseDTO): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/save`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  updateCourse(id: number, course: CourseDTO): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, course);
  }

  searchCourses(name: string): Observable<any> {
    let params = new HttpParams();
    if (name) {
      params = params.append('name', name);
    }
    return this.http.get(`${this.baseUrl}/search`, { params });
  }

  getCourseImage(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/image`, { responseType: 'text' as 'json' });
  }

  createCourse(course: CourseDTO): Observable<CourseDTO> {
    return this.http.post<CourseDTO>(`${this.baseUrl}`, course);
  }

  addModule(courseId: number, module: CourseModuleDTO): Observable<CourseModuleDTO> {
    return this.http.post<CourseModuleDTO>(`${this.baseUrl}/${courseId}/modules`, module);
  }

  addLesson(courseId: number, moduleId: number, title: string, file: File): Observable<LessonDTO> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    return this.http.post<LessonDTO>(`${this.baseUrl}/modules/${moduleId}/lessons`, formData, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  addModuleTest(moduleId: number, moduleTest: ModuleTestDTO): Observable<ModuleTestDTO> {
    return this.http.post<ModuleTestDTO>(`${this.baseUrl}/modules/${moduleId}/moduleTests`, moduleTest);
  }

  getModuleById(courseId: number, moduleId: number): Observable<CourseModuleDTO> {
    return this.http.get<CourseModuleDTO>(`${this.baseUrl}/${courseId}/modules/${moduleId}`);
  }

  addQuestion(moduleId: number, question: ModuleTestQuestionDTO): Observable<ModuleTestQuestionDTO> {
    return this.http.post<ModuleTestQuestionDTO>(`${this.baseUrl}/modules/${moduleId}/questions`, question);
  }

  addOption(moduleId: number, questionId: number, option: ModuleTestQuestionOptionDTO): Observable<ModuleTestQuestionOptionDTO> {
    return this.http.post<ModuleTestQuestionOptionDTO>(`${this.baseUrl}/modules/${moduleId}/questions/${questionId}/options`, option);
  }


}
