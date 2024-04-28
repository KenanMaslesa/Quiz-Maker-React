import React, { FC, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Quiz, QuizQuestion } from "../../models/models";
import quizService from "../../services/quizService";
import QuizNavigation from "./components/QuizNavigation";
import QuizQuestionDisplay from "./components/QuizQuestionDisplay";
import { Box, CircularProgress, Typography } from "@mui/material";
import QuizTitle from "./components/QuizTitle";

const QuizPage: FC = (): JSX.Element => {
  const { quizId } = useParams<{ quizId: string }>();
  const [quizDetails, setQuizDetails] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < (quizDetails?.questions.length ?? 1) - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setShowAnswer(false);
    }
  }, [currentQuestionIndex, quizDetails]);

  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setShowAnswer(false);
    }
  }, [currentQuestionIndex]);

  const handleShowAnswer = useCallback(() => {
    setShowAnswer(true);
  }, []);

  useEffect(() => {
    if (quizId) {
      setIsLoading(true);
      quizService
        .getQuizById(quizId)
        .then((quiz: Quiz) => {
          setQuizDetails(quiz);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.error("Error fetching quiz:", err);
          alert(
            "DEV MESSAGE: Error fetching quiz. Please restart the project with 'npm run start' if you want to edit, delete, or view newly created quizzes."
          );
        });
    }
  }, [quizId]);

  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", padding: "20px" }}>
        <CircularProgress size={40} />
        <Typography variant="body1">Loading...</Typography>
      </Box>
    );
  }

  if (!quizDetails) {
    return (
      <Typography
        variant="h6"
        color="red"
        style={{ textAlign: "center", padding: "10px" }}
      >
        Quiz not found
      </Typography>
    );
  }

  const questions = quizDetails.questions;
  const totalQuestions = questions.length;
  const currentQuestion: QuizQuestion = questions[currentQuestionIndex];

  return (
    <>
      <QuizTitle quizName={quizDetails.name} />
      <Box
        sx={{
          maxWidth: "600px",
          textAlign: "center",
          padding: "30px",
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
        }}
      >
        <QuizQuestionDisplay
          currentQuestion={currentQuestion}
          showAnswer={showAnswer}
          onShowAnswer={handleShowAnswer}
        />
        <QuizNavigation
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          onPrevious={handlePreviousQuestion}
          onNext={handleNextQuestion}
        />
      </Box>
    </>
  );
};

export default QuizPage;
