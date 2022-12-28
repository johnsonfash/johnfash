const shimmer = (h?: number | string) => `
<svg width="100%" height="${
  h || "100%"
}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect width="100%" height="${h || "100%"}" fill="#0009dc11" />
  <rect id="r" width="100%" height="${h || "100%"}" fill="#0009ba11" />
  <animate xlink:href="#r" attributeName="x" from="-100%" to="100%" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const blurImage = (h?: number | string) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(h))}`;
