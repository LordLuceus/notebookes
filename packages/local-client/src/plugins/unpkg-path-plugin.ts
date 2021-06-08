import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "file-cache"
});

export const unpkgPathPlugin = (code: string) => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve(
        { filter: /^index\.js$/ },
        (args: esbuild.OnResolveArgs) => {
          // Handle the root "index.js" entry point.
          return { path: args.path, namespace: "a" };
        }
      );

      build.onResolve({ filter: /^\.+\// }, (args: esbuild.OnResolveArgs) => {
        // Handle relative paths within a module.
        return {
          namespace: "a",
          path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
            .href
        };
      });

      build.onResolve({ filter: /.*/ }, (args: esbuild.OnResolveArgs) => {
        // Handle the main entry point of a module.
        return { namespace: "a", path: `https://unpkg.com/${args.path}` };
      });

      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: code
          };
        }

        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cachedResult) {
          return cachedResult;
        }

        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    }
  };
};
