#!/usr/bin/env node
import { program } from "commander";
import { version } from "../package.json" assert { type: "json" };
import type { Arguments } from "./tools/arguments.js";
import getGitState from "./tools/git/get-state.ts";
import pushGitPage from "./tools/git/push-page.ts";
import matchGithub from "./tools/match-github.ts";

program
  .version(version)
  .option("-b, --branch <page>", "Name of the branch you are pushing to")
  .option("-d, --dist <dist>", "Base directory for all source files")
  .option(
    "-r, --remote <remote>",
    "The address or name of the remote to publish to",
  )
  .option("-m, --message <msg>", "Use the given <msg> as the commit message")
  .option("--silent", "Don't print warnings")
  .option("--nojekyll", "Adds a .nojekyll file to the page branch")
  .parse(process.argv);

const options = program.opts() satisfies Arguments;

async function main(options: Arguments) {
  if (!matchGithub(options.remote)) options.remote = "";
  const { hash, branch, origins } = await getGitState(options.remote);

  if (options.remote === "") {
    if (!origins.length) throw new Error("Remote not found!");

    options.remote = origins.sort((_, b) => (b === "origin" ? 1 : 0))[0];
  }

  await pushGitPage({ hash: hash[0], currentBranch: branch[0], ...options });
}

const mainProcess = main(options);

if (!options.silent)
  mainProcess.catch((error: Error) => console.error(error.message));
