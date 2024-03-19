import type { Arguments } from "./tools/arguments.ts";
import type { IsMatchRemote } from "./tools/is-match/is-match.d.ts";

import getGitState from "./tools/git/get-state.ts";
import pushGitPage from "./tools/git/push-page.ts";
import isMatchGithub from "./tools/is-match/github.ts";
import getRemote from "./tools/get-remote.ts";

async function pushPageFlow(options: Arguments, isMatchRemote: IsMatchRemote) {
  const { hash, branch, origins } = await getGitState(
    isMatchRemote,
    options.remote,
  );

  if (origins) options.remote = getRemote(options.remote, origins);

  await pushGitPage({
    hash: hash[0],
    currentBranch: branch[0],
    ...options,
  });
}

export default function main(
  options: Arguments,
  logger: Console = console,
): void {
  const flow = pushPageFlow(options, isMatchGithub);
  if (!options.silent) flow.catch((e) => logger.error(e));
}
