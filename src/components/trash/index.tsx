import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  CardActions,
} from "@mui/material";
import { Todo } from "../../types";
import { useNavigate } from "react-router-dom";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  removeDeletedTodo,
  restoreTodo,
} from "../../Redux/todoSlice/todoSlice";

const Trash = () => {
  const deletedTodos = useSelector((state: any) => state.todo.deletedTodos);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  const handleRestore = (id: string) => {
    dispatch(restoreTodo(id));
  };

  const handlePermanentDelete = (id: string) => {
    dispatch(removeDeletedTodo(id));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: 3,
        bgcolor: "#f5f5f5",
      }}
    >
      <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
        Trash
      </Typography>
      <Button variant="contained" onClick={handleBackClick}>
        Back to Existing Tasks
      </Button>
      <Grid
        container
        justifyContent="center"
        spacing={3}
        sx={{ width: "100%", mt: 2 }}
      >
        {deletedTodos.map((todo: Todo) => (
          <Grid item key={todo.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              variant="outlined"
              sx={{ width: "100%", position: "relative" }}
            >
              <CardContent>
                <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                  {todo.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {todo.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Deadline: {todo.deadline}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: {todo.status}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleRestore(todo.id)}
                  startIcon={<RestoreIcon />}
                >
                  Restore
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handlePermanentDelete(todo.id)}
                  startIcon={<DeleteForeverIcon />}
                >
                  Delete Forever
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Trash;
