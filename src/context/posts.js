import React, { useReducer } from "react";

const PostsContext = React.createContext([[], () => {}]);
const initialState = {
  posts: [],
  users: [],
  comments: [],
};

let itemsReducer = (thisState = initialState, action) => {
  switch (action.type) {
    case "POSTS":
      return {
        ...thisState,
        posts: action.payload.data,
      };
    case "USERS":
      return {
        ...thisState,
        users: action.payload.data,
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

function PostsProvider(props) {
  const [thisState, dispatch] = useReducer(itemsReducer, initialState);

  const updatePosts = (posts) => {
    dispatch({
      type: "POSTS",
      payload: {
        data: posts,
      },
    });
  };

  const updateUsers = (users) => {
    dispatch({
      type: "USERS",
      payload: {
        data: users,
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
    <PostsContext.Provider
      value={{
        thisState,
        dispatch,
        updatePosts,
        updateUsers,
        updateComments,
      }}
    >
      {props.children}
    </PostsContext.Provider>
  );
}

export { PostsContext, PostsProvider };
