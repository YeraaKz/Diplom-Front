import {CourseModuleDTO} from "./course_moduleDTO";
import {CourseSkillDTO} from "./courseSkillDTO";

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
  skills: CourseSkillDTO[];  // Добавьте это поле
}
