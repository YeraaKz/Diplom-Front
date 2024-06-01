import {LessonDTO} from "./lessonDTO";
import {ModuleTestDTO} from "./module_testDTO";

export class CourseModuleDTO {
  id: number;
  title: string;
  lessons: LessonDTO[];
  moduleTest: ModuleTestDTO
}
