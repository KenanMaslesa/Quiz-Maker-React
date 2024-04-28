import { Visibility } from "@mui/icons-material";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { FC } from "react";
import { Link } from "react-router-dom";
import { Quiz } from "../../../models/models";

interface Props {
  quizzes: Quiz[];
  onRowClick: (quizId: number) => void;
  onDelete: (quizId: number, e: React.MouseEvent<HTMLButtonElement>) => void;
}

const QuizTable: FC<Props> = ({ quizzes, onRowClick, onDelete }) => (
  <Box
    sx={{
      maxHeight: {
        md: 600,
        xs: 500,
      },
      overflowY: "auto",
    }}
  >
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Quiz Name</TableCell>
          <TableCell>Number of Questions</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {quizzes.map((quiz) => (
          <TableRow
            hover
            key={quiz.id}
            onClick={() => onRowClick(quiz.id)}
            style={{ cursor: "pointer" }}
          >
            <TableCell>{quiz.name}</TableCell>
            <TableCell>{quiz.questions.length}</TableCell>
            <TableCell sx={{ padding: { xs: 0 } }}>
              <Link
                to={`/quiz/${quiz.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <Tooltip title="View Quiz">
                  <IconButton>
                    <Visibility />
                  </IconButton>
                </Tooltip>
              </Link>
              <Tooltip title="Delete Quiz">
                <IconButton
                  aria-label="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(quiz.id, e);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    {/* TODO: Add pagination*/}
  </Box>
);

export default QuizTable;
