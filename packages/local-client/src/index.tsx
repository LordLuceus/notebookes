import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";

const App = () => {
  const iframe = useRef<HTMLIFrameElement>(null);
  const [input, setInput] = useState("");

  const initialize = async () => {
    await esbuild.initialize({
      wasmURL: "https://unpkg.com/esbuild-wasm@0.12.6/esbuild.wasm"
    });
  };

  useEffect(() => {
    initialize();
  }, []);

  const onClick = async () => {
    if (iframe.current) {
      iframe.current.srcdoc = html;
    }
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

    iframe.current?.contentWindow?.postMessage(result.outputFiles[0].text, "*");
  };

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

  return (
    <div>
      <CodeEditor initialValue="// Welcome to NotebookES!" />
      <textarea onChange={(e) => setInput(e.target.value)} value={input} />
      <button onClick={onClick}>Submit</button>
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
