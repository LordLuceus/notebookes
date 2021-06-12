import "bulmaswatch/superhero/bulmaswatch.min.css";
import * as esbuild from "esbuild-wasm";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import CodeCell from "./components/code-cell";

const App = () => {
  const initialize = async () => {
    await esbuild.initialize({
      wasmURL: "https://unpkg.com/esbuild-wasm@0.12.8/esbuild.wasm"
    });
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div>
      <CodeCell />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
