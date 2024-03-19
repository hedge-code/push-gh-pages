export default function getRemote(remote: string, origins: string[]) {
  if (!remote) {
    if (!origins.length) throw new Error("Remote not found!");

    const isOrigin = origins.includes("origin");
    return isOrigin ? "origin" : origins[0];
  }

  return remote;
}
