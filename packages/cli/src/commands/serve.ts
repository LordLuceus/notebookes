import { serve } from "@notebookes/local-api";
import { Command } from "commander";
import open from "open";
import path from "path";

const isProduction = process.env.NODE_ENV === "PRODUCTION";
export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing.")
  .option("-p, --port <number>", "Port to run server on.", "4500")
  .action(async (filename = "notebook.js", options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(`Serving ${filename} on port ${options.port}.`);
      open(`http://localhost:${options.port}`);
    } catch (err) {
      if (err.code === "EADDRINUSE") {
        console.error("Port is in use. Try running on a different port.");
      } else {
        console.error("Something went wrong: ", err.message);
      }
      process.exit(1);
    }
  });
