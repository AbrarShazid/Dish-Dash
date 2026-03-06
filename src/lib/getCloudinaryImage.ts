export function getCloudinaryImage(
  url: string | null | undefined,
  width: number,
) {
  if (!url || !url.includes("/upload/")) return url || "";

  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto,c_fill,g_auto,w_${width}/`,
  );
}
