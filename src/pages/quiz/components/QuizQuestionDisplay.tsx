import { FC } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { QuizQuestion } from "../../../models/models";
import { Visibility } from "@mui/icons-material";

interface Props {
  currentQuestion: QuizQuestion;
  showAnswer: boolean;
  onShowAnswer: () => void;
}

const QuizQuestionDisplay: FC<Props> = ({
  currentQuestion,
  showAnswer,
  onShowAnswer,
}) => {
  return (
    <Box
      sx={{
        minWidth: {
          xs: 280,
        },
        maxWidth: 500,
      }}
    >
      <Box sx={{ marginBottom: "20px" }}>
        <Typography variant="h6">{currentQuestion.question}</Typography>
      </Box>
      <Box
        sx={{
          position: "relative",
          marginTop: "10px",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            filter: showAnswer ? "none" : "blur(8px)",
            marginBottom: "20px",
          }}
        >
          {currentQuestion.answer}
        </Typography>
        {!showAnswer && (
          <IconButton
            onClick={onShowAnswer}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Visibility />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default QuizQuestionDisplay;
