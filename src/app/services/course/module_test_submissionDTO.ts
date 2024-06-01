export interface ModuleTestSubmissionDTO {
  id: number;
  score: number;
  totalQuestions: number;
  passed: boolean; // вот здесь хранится успешно ли пользователь сдал тест или нет
  submissionDate: string;
  userId: number;
  moduleTestId: number;
}
