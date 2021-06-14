import "bulmaswatch/superhero/bulmaswatch.min.css";
import * as esbuild from "esbuild-wasm";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import TextEditor from "./components/text-editor";
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
        {/* <CodeCell /> */}
        <TextEditor />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
