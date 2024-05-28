import {CourseModuleDTO} from "./course_moduleDTO";

export interface CourseDTO {
  id: number;
  name: string;
  description: string;
  level: string;
  language: string;
  imageKey: string;
  durationInMonths: string;
  dateCreated: Date;
  modules: CourseModuleDTO[]
}
