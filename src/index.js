import React from "react";
import { createRoot } from "react-dom/client";
import './main.scss';
import './styles.scss';
import BoardView from "./components/Board";
const App = () => {
  return <BoardView/>;
};

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
