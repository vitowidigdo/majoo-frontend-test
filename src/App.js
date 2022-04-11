import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";

import Posts from "components/Posts";
import Albums from "components/Albums";

import { PostsProvider } from "./context/posts";
import PageNotFound from "./pages/Home";
import Comments from "components/Comments";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <PostsProvider>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>

          <Route exact path="/posts/" element={<Posts />}></Route>
          <Route exact path="/posts/:id" element={<Posts />}></Route>

          <Route exact path="/albums/" element={<Albums />}></Route>
          <Route exact path="/albums/:id" element={<Albums />}></Route>

          <Route exact path="/comments/" element={<Comments />}></Route>
          <Route exact path="/comments/:id" element={<Comments />}></Route>

          <Route exact path="*" element={<PageNotFound />}></Route>
        </Routes>
      </PostsProvider>
    </>
  );
}

export default App;
