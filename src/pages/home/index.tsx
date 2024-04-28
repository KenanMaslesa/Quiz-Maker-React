import { Paper, Typography, Box, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FC, useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Quiz } from "../../models/models";
import quizService from "../../services/quizService";
import QuizTable from "./components/QuizTable";

const HomePage: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    quizService
      .getQuizzes()
      .then((data: Quiz[]) => {
        setQuizzes(data);
      })
      .catch((err) => {
        alert("DEV MESSAGE: Error fetching quizzes:");
        console.error("Error fetching quizzes:", err);
      });
  }, []);

  const deleteQuiz = useCallback(async (quizId: number) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) {
      return;
    }

    try {
      await quizService.deleteQuiz(quizId);
      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz.id !== quizId)
      );
    } catch (error) {
      console.error("Error deleting quiz:", error);
      alert(
        "DEV MESSAGE: Error deleting quiz. Please restart the project with 'npm run start' if you want to edit, delete, or view newly created quizzes."
      );
    }
  }, []);

  const handleRowClick = useCallback((quizId: number): void => {
    navigate(`/edit-quiz/${quizId}`);
  }, []);

  return (
    <Paper
      sx={{
        padding: "20px",
        minWidth: {
          md: 500,
        },
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        React Quiz Maker
      </Typography>

      <QuizTable
        quizzes={quizzes}
        onRowClick={handleRowClick}
        onDelete={deleteQuiz}
      />

      <Box mt={3}>
        <Link to="/create-quiz">
          <Button variant="contained" fullWidth startIcon={<AddCircleIcon />}>
            Create New Quiz
          </Button>
        </Link>
      </Box>
    </Paper>
  );
};

export default HomePage;
