import express from "express";
import path from "path";

export const serve = (port: number, filename: string, dir: string) => {
  const app = express();

  // app.use(
  //   createProxyMiddleware({
  //     target: "http://localhost:3000",
  //     ws: true,
  //     logLevel: "silent",
  //   })
  // );

  const packagePath = require.resolve("local-client/build/index.html");
  app.use(express.static(path.dirname(packagePath)));

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
