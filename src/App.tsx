import React from "react";
import { Routes, Route } from "react-router";
import TodoMain from "./components/TodoMain";
import Trash from "./components/trash";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TodoMain />} />
        <Route path="/trash" element={<Trash />} />
      </Routes>
    </div>
  );
}

export default App;
