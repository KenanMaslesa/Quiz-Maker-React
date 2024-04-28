import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FC } from "react";
import { QuizQuestion } from "../../../models/models";

interface QuestionsListProps {
  quizQuestions: QuizQuestion[];
  deleteQuizQuestion: (questionId: number) => void;
}

const QuestionsList: FC<QuestionsListProps> = ({
  quizQuestions,
  deleteQuizQuestion,
}) => {
  return (
    <Box mt={3}>
      <Typography variant="h6">Questions in this Quiz:</Typography>
      <List
        sx={{
          maxHeight: "260px",
          overflowY: "auto",
        }}
      >
        {quizQuestions.length === 0 ? (
          <Typography variant="body2" mb={2} color="textSecondary">
            No questions available. Please add some questions to the quiz.
          </Typography>
        ) : (
          <List>
            {quizQuestions.map((q, index) => (
              <ListItem key={q.id}>
                <ListItemText primary={`${index + 1}. ${q.question}`} />
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteQuizQuestion(q.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}
      </List>
    </Box>
  );
};

export default QuestionsList;
