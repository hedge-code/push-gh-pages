import type { Arguments } from "./arguments.d.ts";

import getGitState from "./git/get-state.ts";
import pushGitPage from "./git/push-page.ts";
import getRemote from "./tools/get-remote.ts";

async function pushPageFlow(options: Arguments, regexp: RegExp) {
  const { hash, branch, origins } = await getGitState(regexp, options.remote);

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
  regexp: RegExp = /github\.com\/([^/]+)\//,
): void {
  const flow = pushPageFlow(options, regexp);
  if (!options.silent) flow.catch((e) => logger.error(e));
}
