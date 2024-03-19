import fs from "fs";
import fsPromises from "fs/promises";
import type { Arguments } from "../arguments.js";
import execPromise from "../exec-promise.ts";

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
  const dirPromises = [fsPromises.cp(`./${dist}`, ".", { recursive: true })];
  if (nojekyll) dirPromises.push(fsPromises.writeFile(".nojekyll", ""));
  await Promise.all(dirPromises);
  await execPromise("git add .");
  if (isGitIgnore) await execPromise("git rm -f .gitignore");
  const createMessage = () => `Github pages based on ${hash}`;
  await execPromise(`git commit -m "${message || createMessage()}"`);
  await execPromise(`git push -u -f ${remote} HEAD:${branch}`);
  await execPromise(`git switch ${currentBranch}`);
  await execPromise(`git branch -D ${branch}`);
}
