import type { Arguments } from "../arguments.d.ts";

import fs from "fs";
import { cp, writeFile } from "fs/promises";
import execPromise from "../tools/exec-promise.ts";

interface PushGitPageProps extends Partial<Arguments> {
  currentBranch: string;
  hash: string;
}

export default async function pushGitPage({
  currentBranch,
  message,
  remote,
  hash,
  branch = "page",
  dist = "dist",
  nojekyll = false,
}: PushGitPageProps) {
  if ([currentBranch, "master", "main", "dev"].includes(branch))
    throw new Error("Protected branches breach!");

  if (!fs.existsSync(dist)) throw new Error("Bundler output doesn't exists!");

  const isGitIgnore = fs.existsSync(".gitignore");

  await execPromise(`git checkout --orphan ${branch}`);
  await execPromise("git add .");
  if (isGitIgnore) await execPromise("git rm --cache .gitignore");
  await execPromise("git rm -r -f .");
  const dirPromises = [cp(`./${dist}`, ".", { recursive: true })];
  if (nojekyll) dirPromises.push(writeFile(".nojekyll", ""));
  await Promise.all(dirPromises);
  await execPromise("git add .");
  if (isGitIgnore) await execPromise("git rm -f .gitignore");
  await execPromise(`git commit -m "${message || `Pages based on ${hash}`}"`);
  await execPromise(`git push -u -f ${remote} HEAD:${branch}`);
  await execPromise(`git switch ${currentBranch}`);
  await execPromise(`git branch -D ${branch}`);
}
