import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";

import { TasksProvider } from "./context/tasks";
import PageNotFound from "./pages/Home";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <TasksProvider>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>

          <Route exact path="*" element={<PageNotFound />}></Route>
        </Routes>
      </TasksProvider>
    </>
  );
}

export default App;
