import "@fortawesome/fontawesome-free/css/all.min.css";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import * as esbuild from "esbuild-wasm";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import CellList from "./components/cell-list";
import { store } from "./state";

const App = () => {
  const initialize = async () => {
    await esbuild.initialize({
      wasmURL: "https://unpkg.com/esbuild-wasm@0.12.8/esbuild.wasm",
    });
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
