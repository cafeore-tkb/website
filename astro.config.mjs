// @ts-check

import cloudflare from "@astrojs/cloudflare";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://cafeore.cafe",
  adapter: cloudflare({
    imageService: "compile",
  }),
  build: {
    concurrency: 50,
  },
  image: {
    domains: ["images.microcms-assets.io"],
  },
  integrations: [react()],
});
