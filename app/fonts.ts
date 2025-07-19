import localFont from "next/font/local";

export const synemono = localFont({
  src: [
    {
      path: "./fonts/synemono-regular-webfont.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-synemono",
});

export const rune = localFont({
  src: [
    {
      path: "./fonts/rune-webfont.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-rune",
});