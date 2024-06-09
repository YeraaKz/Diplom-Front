import {ModuleTestQuestionDTO} from "./module_test_questionDTO";
import {ModuleTestSubmissionDTO} from "./module_test_submissionDTO";

export class ModuleTestDTO {
  id: number;
  testName: string;
  questions: ModuleTestQuestionDTO[]
  submissions: ModuleTestSubmissionDTO[]; // Массив результатов тестов
}
