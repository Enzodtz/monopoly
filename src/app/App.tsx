import Game from "@/features/game/Game";

import { Provider } from "react-redux";
import "./App.css";
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
}
