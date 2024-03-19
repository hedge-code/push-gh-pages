import type { IsMatchRemote } from "./is-match/is-match.js";

export default function extractMatchOrigins(
  candidates: string[],
  pattern: IsMatchRemote,
) {
  const push = candidates.filter((candidate) => candidate.includes("(push)"));
  const matching = [...new Set(push)]
    .filter(pattern)
    .map((x) => x.substring(0, x.indexOf("\t")));

  return matching;
}
