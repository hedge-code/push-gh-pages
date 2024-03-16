export default function (remote: string = "") {
  return remote.match(/github\.com\/([^/]+)\//);
}
