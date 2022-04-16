import React, { useReducer } from "react";

const TasksContext = React.createContext([[], () => {}]);
const initialState = {
  posts: [],
  task: [],
  comments: [],
};

let itemsReducer = (thisState = initialState, action) => {
  switch (action.type) {
    case "POSTS":
      return {
        ...thisState,
        posts: action.payload.data,
      };
    case "TASK":
      return {
        ...thisState,
        task: action.payload.data,
      };
    case "COMMENTS":
      return {
        ...thisState,
        comments: action.payload.data,
      };
    default:
      return thisState;
  }
};

function TasksProvider(props) {
  const [thisState, dispatch] = useReducer(itemsReducer, initialState);

  const updatePosts = (posts) => {
    dispatch({
      type: "POSTS",
      payload: {
        data: posts,
      },
    });
  };

  const updateTask = (task) => {
    dispatch({
      type: "TASK",
      payload: {
        data: task,
      },
    });
  };

  const updateComments = (comments) => {
    dispatch({
      type: "COMMENTS",
      payload: {
        data: comments,
      },
    });
  };

  return (
    <TasksContext.Provider
      value={{
        thisState,
        dispatch,
        updatePosts,
        updateTask,
        updateComments,
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
}

export { TasksContext, TasksProvider };
