import {LessonDTO} from "./lessonDTO";

export class CourseModuleDTO {
  id: number;
  title: string;
  lessons: LessonDTO[];
}
