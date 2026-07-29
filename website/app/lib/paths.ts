export const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const feedbackEndpoint =
  process.env.NEXT_PUBLIC_FEEDBACK_ENDPOINT ?? "/api/feedback";

export function withBasePath(path: string) {
  if (!path.startsWith("/")) {
    return path;
  }

  return `${siteBasePath}${path}`;
}
