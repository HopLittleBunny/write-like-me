import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const websiteRoot = path.dirname(fileURLToPath(import.meta.url));

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryName =
  process.env.GITHUB_REPOSITORY?.split("/").at(-1) ?? "write-like-me";
const basePath = isGitHubPages ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: websiteRoot,
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
