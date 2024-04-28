import { Typography, useTheme, useMediaQuery } from "@mui/material";

const QuizTitle = ({ quizName }: { quizName: string }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Typography
      variant="h1"
      sx={{
        fontWeight: 200,
        textAlign: "center",
        color: "#61dafb",
        margin: "0 0 30px 0",
        fontSize: isDesktop ? "80px" : "40px",
      }}
    >
      {quizName}
    </Typography>
  );
};

export default QuizTitle;
