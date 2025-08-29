type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}

interface ImportMetaEnv {
  readonly MICROCMS_API_URL: string;
  readonly MICROCMS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
