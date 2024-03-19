import type { IsMatchRemote } from "../is-match/is-match.d.ts";

import extractMatchOrigins from "../extract-match-origins.ts";
import execPromise from "../exec-promise.ts";
import linesToArray from "../lines-to-array.ts";

export default async function getGitState(
  isMatchRemote: IsMatchRemote,
  repo: string = "",
) {
  if (repo && !isMatchRemote(repo)) throw new Error("Invalid remote");

  const promises = [
    execPromise("git rev-parse HEAD"),
    execPromise("git name-rev --name-only HEAD"),
  ];

  if (!repo) promises.push(execPromise("git remote -v"));

  const [hash, branch, verbose] = await Promise.all(promises).then((res) => {
    const firstError = res.map(({ stderr }) => stderr.trim()).find(Boolean);
    if (firstError) throw new Error(firstError);

    return res.map(({ stdout }) => linesToArray(stdout));
  });

  if (!branch) throw new Error("Could not get sha1 for HEAD.");

  let origins;
  if (verbose) origins = extractMatchOrigins(verbose, isMatchRemote);

  return { hash, branch, origins };
}
