import { Box, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FC, useState } from "react";
import { QuizQuestion } from "../../../models/models";

interface Props {
  quizQuestions: QuizQuestion[];
  setQuizQuestions: (quizQuestions: QuizQuestion[]) => void;
}

const NewQuestionTab: FC<Props> = ({
  quizQuestions,
  setQuizQuestions,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [currentAnswer, setCurrentAnswer] = useState<string>("");

  const addNewQuestion = (): void => {
    if (currentQuestion && currentAnswer) {
      const newQuestion: QuizQuestion = {
        id: Date.now(),
        question: currentQuestion,
        answer: currentAnswer,
      };

      setQuizQuestions([...quizQuestions, newQuestion]);
      setCurrentQuestion("");
      setCurrentAnswer("");
    }
  };

  return (
    <Box mt={3}>
      <TextField
        label="Question"
        value={currentQuestion}
        onChange={(e) => setCurrentQuestion(e.target.value)}
        fullWidth
      />
      <TextField
        label="Answer"
        value={currentAnswer}
        onChange={(e) => setCurrentAnswer(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
      />

      <Button
        variant="contained"
        fullWidth
        startIcon={<AddIcon />}
        onClick={addNewQuestion}
        disabled={!currentQuestion || !currentAnswer}
        sx={{ mt: 2 }}
      >
        Add New Question
      </Button>
    </Box>
  );
};

export default NewQuestionTab;
