import React, { FC, useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Quiz, QuizQuestion } from "../../models/models";
import quizService from "../../services/quizService";
import NewQuestionTab from "./components/NewQuestionTab";
import ExistingQuestionsTab from "./components/ExistingQuestionsTab";
import QuestionsList from "./components/QuestionsList";

enum TabValues {
  NewQuestion,
  ExistingQuestions,
}

const CreateEditQuizPage: FC = (): JSX.Element => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const [quizName, setQuizName] = useState<string>("");
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<QuizQuestion[]>(
    []
  );
  const [activeTab, setActiveTab] = useState<TabValues>(TabValues.NewQuestion);

  // Fetch existing quiz data if in edit mode
  useEffect(() => {
    if (quizId) {
      quizService
        .getQuizById(quizId)
        .then((quiz: Quiz) => {
          setQuizName(quiz.name);
          setQuizQuestions(quiz.questions);
        })
        .catch((error) => {
          console.error("Error fetching quiz:", error);
        });
    }
  }, [quizId]);

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: TabValues): void => {
      setActiveTab(newValue);
    },
    []
  );

  const deleteQuizQuestion = useCallback((questionId: number): void => {
    setQuizQuestions((prevQuestions) =>
      prevQuestions.filter((q) => q.id !== questionId)
    );
  }, []);

  const submitQuiz = useCallback(async () => {
    const newQuiz: Quiz = {
      id: Date.now(),
      name: quizName,
      questions: quizQuestions,
    };

    try {
      if (quizId) {
        await quizService.updateQuiz(newQuiz, quizId);
      } else {
        await quizService.createQuiz(newQuiz);
      }
      navigate("/");
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  }, [quizName, quizQuestions, quizId]);

  const setQuizQuestionsHandler = useCallback((questions: QuizQuestion[]) => {
    setQuizQuestions(questions);
  }, []);

  const setSelectedQuestionsHandler = useCallback(
    (questions: QuizQuestion[]) => {
      setSelectedQuestions(questions);
    },
    []
  );

  return (
    <Paper
      sx={{
        padding: "20px",
        marginTop: "20px",
        maxWidth: {
          md: 500,
          xs: 350,
        },
        width: {
          md: 500,
        },
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 3 }}>
        {quizId ? "Edit Quiz" : "Create Quiz"}
      </Typography>
      <Box mb={3}>
        <TextField
          label="Quiz Name"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
          fullWidth
          required
        />
      </Box>

      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="New Question" />
        <Tab label="Existing Questions" />
      </Tabs>

      {activeTab === TabValues.NewQuestion && (
        <NewQuestionTab
          quizQuestions={quizQuestions}
          setQuizQuestions={setQuizQuestionsHandler}
        />
      )}

      {activeTab === TabValues.ExistingQuestions && (
        <ExistingQuestionsTab
          selectedQuestions={selectedQuestions}
          setSelectedQuestions={setSelectedQuestionsHandler}
          quizQuestions={quizQuestions}
          setQuizQuestions={setQuizQuestionsHandler}
        />
      )}

      <QuestionsList
        quizQuestions={quizQuestions}
        deleteQuizQuestion={deleteQuizQuestion}
      />

      <Button
        fullWidth
        variant="contained"
        color="primary"
        startIcon={<CheckCircleIcon />}
        onClick={submitQuiz}
        disabled={!quizName || quizQuestions.length === 0}
      >
        {quizId ? "Update Quiz" : "Create Quiz"}
      </Button>
    </Paper>
  );
};

export default CreateEditQuizPage;
