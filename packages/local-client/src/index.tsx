import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

const App = () => {
  const iframe = useRef<any>();
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const initialize = async () => {
    await esbuild.initialize({
      wasmURL: "https://unpkg.com/esbuild-wasm@0.12.6/esbuild.wasm"
    });
  };

  useEffect(() => {
    initialize();
  }, []);

  const onClick = async () => {
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": "'production'",
        global: "window"
      }
    });
    // setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            eval(event.data);
          }, false);
        </script>
      </body>
    </html>
  `;

  return (
    <div>
      <textarea onChange={(e) => setInput(e.target.value)} value={input} />
      <button onClick={onClick}>Submit</button>
      <pre>{code}</pre>
      <iframe
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
        title="Preview"
      />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
