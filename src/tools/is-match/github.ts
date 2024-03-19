export default function isMatchGithub(remote: string = "") {
  return /github\.com\/([^/]+)\//.test(remote);
}
