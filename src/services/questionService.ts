import { QuizQuestion } from "../models/models";
import { API_BASE_URL } from "../utils/constants";

export interface QuestionService {
  getQuestions: () => Promise<QuizQuestion[]>;
  // According to the API declarations (as defined in Swagger), there's only a GET endpoint for fetching all questions.
  // This implies that adding or creating unique questions will occur when creating a quiz (via POST to /quizzes).
  // Any specific logic for handling unique questions or other related operations will be managed on the backend.
}

const questionService: QuestionService = {
  getQuestions: async (): Promise<QuizQuestion[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/questions`);
      if (!response.ok) {
        throw new Error(`Error fetching questions: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Network error:", error);
      throw error;
    }
  },
};

export default questionService;
