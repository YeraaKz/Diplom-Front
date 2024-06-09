import {LessonDTO} from "./lessonDTO";
import {ModuleTestDTO} from "./module_testDTO";

export class CourseModuleDTO {
  id: number;
  title: string;
  lessons: LessonDTO[]; // те самые уроки
  moduleTest: ModuleTestDTO // их тоже нам нужно добавлять, в каждом курсе должен быть один модульный тест
}
