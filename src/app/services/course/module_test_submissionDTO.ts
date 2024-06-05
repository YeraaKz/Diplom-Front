import {UserDTO} from "../user/userDTO";

export interface ModuleTestSubmissionDTO {
  id: number;
  score: number;
  totalQuestions: number;
  passed: boolean; // вот здесь хранится успешно ли пользователь сдал тест или нет
  submissionDate: string;
  user: UserDTO; // Userid пользователя который сдал тест
  moduleTestId: number;
}
