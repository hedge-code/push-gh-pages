import detectGithubOrigins from "../detect-origins-pattern.ts";
import execPromise from "../exec-promise.ts";
import matchGithub from "../match-github.ts";

export default async function getGitState(repo: string = "") {
  const promises = [
    execPromise("git rev-parse HEAD"),
    execPromise("git name-rev --name-only HEAD"),
  ];
  if (repo === "") {
    promises.push(execPromise("git remote -v"));
  }

  const [hash, branch, verbose] = await Promise.all(promises).then((res) => {
    res
      .map(({ stderr }) => stderr.trim())
      .filter((err) => err)
      .forEach((err) => {
        throw new Error(err);
      });
    return res.map(({ stdout }) =>
      stdout
        .trim()
        .split("\n")
        .map((v) => v.split(" ")[0].trim()),
    );
  });

  if (!branch) throw new Error("Could not get sha1 for HEAD.");

  const origins = detectGithubOrigins(verbose, matchGithub);

  return { hash, branch, origins };
}
