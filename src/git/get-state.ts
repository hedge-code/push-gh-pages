import extractMatchOrigins from "../tools/extract-match-origins.ts";
import execPromise from "../tools/exec-promise.ts";
import splitLines from "../tools/split-lines.ts";

export default async function getGitState(regexp: RegExp, repo: string = "") {
  let isMatchRemote: boolean;
  const testRemotePattern = (remote: string) => regexp.test(remote);

  if (repo) {
    isMatchRemote = testRemotePattern(repo);
    if (!isMatchRemote) throw new Error("Invalid remote");
  }

  const promises = [
    execPromise("git rev-parse HEAD"),
    execPromise("git name-rev --name-only HEAD"),
  ];

  if (!repo) promises.push();

  const [hash, branch] = await Promise.all(promises).then((res) => {
    const firstError = res.map(({ stderr }) => stderr.trim()).find(Boolean);
    if (firstError) throw new Error(firstError);

    return res.map(({ stdout }) => stdout.trim());
  });

  if (!branch) throw new Error("Could not get sha1 for HEAD.");

  let origins;
  if (!repo) {
    const verbosePromise = execPromise("git remote -v").then(
      ({ stderr, stdout }) => {
        if (stderr) throw new Error(stderr);
        return splitLines(stdout);
      },
    );
    origins = extractMatchOrigins(await verbosePromise, testRemotePattern);
  }

  return { hash, branch, origins };
}
