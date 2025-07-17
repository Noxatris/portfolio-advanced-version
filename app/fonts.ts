import localFont from "next/font/local";

// Raleway (variable font)
export const synemono = localFont({
  src: [
    {
      path: "./fonts/synemono-regular-webfont.woff2", // chemin relatif à ce fichier
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-synemono",
});