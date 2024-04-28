import { Quiz } from "../models/models";
import { API_BASE_URL } from "../utils/constants";

export interface QuizService {
  getQuizzes: () => Promise<Quiz[]>;
  deleteQuiz: (quizId: number) => Promise<void>;
  getQuizById: (quizId: string) => Promise<Quiz>;
  createQuiz: (quiz: Quiz) => Promise<void>;
  updateQuiz: (quiz: Quiz, quizId: string) => Promise<void>;
}

const quizService: QuizService = {
  getQuizzes: async (): Promise<Quiz[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes`);
      if (!response.ok) {
        throw new Error(`Error fetching quizzes: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Network error:", error);
      throw error;
    }
  },

  deleteQuiz: async (quizId: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes/${quizId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete quiz: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
      throw error;
    }
  },

  getQuizById: async (quizId: string): Promise<Quiz> => {
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes/${quizId}`);
      if (!response.ok) {
        throw new Error(`Error fetching quiz: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Network error:", error);
      throw error;
    }
  },

  createQuiz: async (quiz: Quiz): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quiz),
      });

      if (!response.ok) {
        throw new Error(`Error creating quiz: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
      throw error;
    }
  },

  updateQuiz: async (quiz: Quiz, quizId: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes/${quizId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quiz),
      });

      if (!response.ok) {
        throw new Error(`Error updating quiz: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating quiz:", error);
      throw error;
    }
  },
};

export default quizService;
