#!/usr/bin/env node
import type { Arguments } from "./tools/arguments.d.ts";

import { program } from "commander";
import { version } from "../package.json" assert { type: "json" };
import main from "./main.ts";

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

main(options);
