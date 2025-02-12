import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:{
          1:"#E43D12",
          2:"#D6536D",
          3:"#FFA2B6"
        },
        secondary:{
          1:"#EFB11D",
          2:"#EBE9E1"
        },
        white:{
          1:"#EBE9E1",
          2:"#FFFFFF"
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
