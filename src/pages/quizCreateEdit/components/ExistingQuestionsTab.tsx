import {
  Box,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FC, useEffect, useState } from "react";
import { QuizQuestion } from "../../../models/models";
import questionService from "../../../services/questionService";

interface Props {
  selectedQuestions: QuizQuestion[];
  setSelectedQuestions: (selectedQuestions: QuizQuestion[]) => void;
  quizQuestions: QuizQuestion[];
  setQuizQuestions: (quizQuestions: QuizQuestion[]) => void;
}

const ExistingQuestionsTab: FC<Props> = ({
  selectedQuestions,
  setSelectedQuestions,
  quizQuestions,
  setQuizQuestions,
}) => {
  const [allQuestions, setAllQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    questionService.getQuestions().then((questions) => {
      setAllQuestions(questions);
    });
  }, []);

  const addSelectedQuestions = (): void => {
    setQuizQuestions([...quizQuestions, ...selectedQuestions]);
    setSelectedQuestions([]);
  };

  return (
    <Box mt={3}>
      <FormControl fullWidth>
        <InputLabel>Existing Questions</InputLabel>
        <Select
          multiple
          input={<OutlinedInput label="Existing Questions" />}
          value={selectedQuestions.map((q) => q.id)}
          onChange={(e) => {
            const selectedIds = e.target.value as number[];
            const selected = allQuestions.filter((q) =>
              selectedIds.includes(q.id)
            );
            setSelectedQuestions(selected);
          }}
        >
          {allQuestions
            .filter((q) => !quizQuestions.some((sq) => sq.id === q.id))
            .map((q) => (
              <MenuItem key={q.id} value={q.id}>
                {q.question}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        fullWidth
        startIcon={<AddIcon />}
        onClick={addSelectedQuestions}
        disabled={selectedQuestions.length === 0}
        sx={{ mt: 2 }}
      >
        Add Selected Questions
      </Button>
    </Box>
  );
};

export default ExistingQuestionsTab;
