import { FC } from "react";
import { Typography, Box, IconButton, Grid } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

interface Props {
  currentQuestionIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
}

const QuizNavigation: FC<Props> = ({
  currentQuestionIndex,
  totalQuestions,
  onPrevious,
  onNext,
}) => {
  return (
    <Box display="flex" justifyContent="center">
      <Grid
        container
        width="150px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <IconButton onClick={onPrevious} disabled={currentQuestionIndex <= 0}>
            <ArrowBack />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="body1">
            {currentQuestionIndex + 1} of {totalQuestions}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            onClick={onNext}
            disabled={currentQuestionIndex >= totalQuestions - 1}
          >
            <ArrowForward />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuizNavigation;
