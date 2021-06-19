import { Command } from "commander";
import { serve } from "local-api";
import path from "path";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing.")
  .option("-p, --port <number>", "Port to run server on.", "4500")
  .action(async (filename = "notebook.js", options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(parseInt(options.port), path.basename(filename), dir);
    } catch (err) {
      console.error(err.message);
    }
  });
