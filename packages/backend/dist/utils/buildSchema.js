// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/no-unsafe-return */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import fs from "fs";
// import path from "path";
// import glob from "glob";
// import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
// import { makeExecutableSchema } from "@graphql-tools/schema";
export {};
// export const buildSchema = async () => {
//   //utilsの絶対パスをビルドしてくる
//   const __dirname = path.dirname(new URL(import.meta.url).pathname);
//   //modulesの絶対パスをビルドしてくる
//   const pathToModules = path.join(__dirname, "..", "modules");
//   //resolversファイルのパスをビルド
//   const pathToResolvers = path.join(pathToModules, "**", "*.resolvers.?s");
//   //resolversファイル全てを指定
//   //mapで分けてそれぞれimportする
//   const resolversPromises = glob
//     .sync(pathToResolvers)
//     .map((resolversFile) => import(resolversFile));
//   //resolversファイルをすべて読み込む
//     const resolvers = (await Promise.all(resolversPromises)).map(
//     (fileItems) => fileItems.resolvers
//   );
//   //graphqlファイルのパスをビルド
//   const pathToTypeDefs = path.join(pathToModules, "**", "*.graphql");
//   //graphqlファイルを直接すべて読み込む
//   const typeDefs = glob
//     .sync(pathToTypeDefs)
//     .map((typeDefsFile) => fs.readFileSync(typeDefsFile, { encoding: "utf8" }));
//   return makeExecutableSchema({
//     resolvers: mergeResolvers([...resolvers]),
//     typeDefs: mergeTypeDefs([...typeDefs]),
//   });
// };
