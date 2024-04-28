import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import QuizPage from "./pages/quiz";
import CreateEditQuizPage from "./pages/quizCreateEdit";
import Footer from "./components/Footer";

const App: FC = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz/:quizId" element={<QuizPage />} />
        <Route path="/create-quiz" element={<CreateEditQuizPage />} />
        <Route path="/edit-quiz/:quizId" element={<CreateEditQuizPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
