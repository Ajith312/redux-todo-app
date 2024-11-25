import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [
      {
        todo_id: 1,
        todo_Name: "Go to Gym",
        todo_Description: "Need to Go Gym Daily",
        completed_Status: false,
      },
      {
        todo_id: 2,
        todo_Name: "Learn React",
        todo_Description: "Study Redux Toolkit",
        completed_Status: true,
      },
    ],
    filteredTodos: [{
      todo_id: 1,
      todo_Name: "Go to Gym",
      todo_Description: "Need to Go Gym Daily",
      completed_Status: false,
    },
    {
      todo_id: 2,
      todo_Name: "Learn React",
      todo_Description: "Study Redux Toolkit",
      completed_Status: true,
    },],
    todo_Name: "",
    todo_Description: "",
    editTodo: null,
    editing_todo_Name: "",
    editing_todo_Description: "",
  },
  reducers: {
    addTodo(state, action) {
      return {
        ...state,
        todos: [...state.todos, action.payload],
        filteredTodos: [...state.todos, action.payload],
        todo_Name: "",
        todo_Description: "",
      };
    },
    deleteTodo(state, action) {
      const deletedTodos = state.todos.filter(
        (todo) => todo.todo_id !== action.payload
      );
      return {
        ...state,
        todos: deletedTodos,
        filteredTodos: deletedTodos,
      };
    },
    toggleTodo(state, action) {
      const updatedTodos = state.todos.map((todo) =>
        todo.todo_id === action.payload
          ? { ...todo, completed_Status: !todo.completed_Status }
          : todo
      );
      return {
        ...state,
        todos: updatedTodos,
        filteredTodos: updatedTodos,
      };
    },
    handleTodoName(state, action) {
      return {
        ...state,
        todo_Name: action.payload,
      };
    },
    handleTodoDescription(state, action) {
      return {
        ...state,
        todo_Description: action.payload,
      };
    },
    handleEditingTodo(state, action) {
      return {
        ...state,
        editTodo: action.payload,
        editing_todo_Name: action.payload.todo_Name,
        editing_todo_Description: action.payload.todo_Description,
      };
    },
    handleEditingTodoName(state, action) {
      return {
        ...state,
        editing_todo_Name: action.payload,
      };
    },
    handleEditingTodoDescription(state, action) {
      return {
        ...state,
        editing_todo_Description: action.payload,
      };
    },
    updateTodos(state, action) {
      return {
        ...state,
        todos: action.payload,
        filteredTodos: action.payload,
      };
    },
    handleFilterTodo(state, action) {
      if (action.payload === "all") {
        return {
          ...state,
          filteredTodos: state.todos,
        };
      } else if (action.payload === "completed") {
        return {
          ...state,
          filteredTodos: state.todos.filter(
            (todo) => todo.completed_Status === true
          ),
        };
      } else {
        return {
          ...state,
          filteredTodos: state.todos.filter(
            (todo) => todo.completed_Status === false
          ),
        };
      }
    },
    resetEditState(state) {
      return {
        ...state,
        editTodo: null,
        editing_todo_Name: "",
        editing_todo_Description: "",
      };
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleTodo,
  handleTodoName,
  handleTodoDescription,
  handleEditingTodo,
  handleEditingTodoName,
  handleEditingTodoDescription,
  updateTodos,
  handleFilterTodo,
  resetEditState,
} = todoSlice.actions;

export default todoSlice.reducer;
