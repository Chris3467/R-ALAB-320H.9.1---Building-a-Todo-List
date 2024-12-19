import { useReducer, useState } from "react";

const initialState = [];

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return [
        {
          id: Date.now(),
          task: action.payload,
          completed: false,
          isEditing: false,
        },
        ...state,
      ];
    case "TOGGLE_COMPLETE":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "DELETE_TASK":
      return state.filter((todo) => todo.id !== action.payload);
    case "EDIT_TASK":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, task: action.payload.task, isEditing: false }
          : todo
      );
    case "TOGGLE_EDIT":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, isEditing: !todo.isEditing }
          : todo
      );
    default:
      return state;
  }
}

function ToDoList() {
  const [task, setTask] = useState("");
  const [todoList, dispatch] = useReducer(todoReducer, initialState);

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch({ type: "ADD_TASK", payload: task });
      setTask("");
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            {todo.isEditing ? (
              <input
                type="text"
                value={todo.task}
                onChange={(e) =>
                  dispatch({
                    type: "EDIT_TASK",
                    payload: { id: todo.id, task: e.target.value },
                  })
                }
              />
            ) : (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.task}
              </span>
            )}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                dispatch({ type: "TOGGLE_COMPLETE", payload: todo.id })
              }
            />
            <button
              onClick={() =>
                dispatch({ type: "TOGGLE_EDIT", payload: todo.id })
              }
            >
              {todo.isEditing ? "Save" : "Edit"}
            </button>
            <button
              onClick={() =>
                dispatch({ type: "DELETE_TASK", payload: todo.id })
              }
              disabled={!todo.completed}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
