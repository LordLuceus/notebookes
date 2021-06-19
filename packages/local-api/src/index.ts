export const serve = (port: number, filename: string, dir: string) => {
  console.log(
    `Serving traffic on port ${port}. Editing ${filename}, which is in ${dir}.`
  );
};
