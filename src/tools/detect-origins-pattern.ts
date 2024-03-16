export default function detectOriginsPattern(
  candidates: string[],
  pattern: (remote: string) => RegExpMatchArray | null,
) {
  return Array.from(
    new Set(
      Array.from(new Set(candidates))
        .filter((item) => pattern(item))
        .map((item) => item.split("\t")[0]),
    ),
  );
}
