import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
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
    }
  };
};
