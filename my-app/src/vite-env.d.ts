/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_ADMIN_PASSWORD: string;
  readonly VITE_RESEND_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  readonly glob: <T = { [key: string]: any }>(
    pattern: string | string[],
    options?: {
      as?: string;
      eager?: boolean;
      import?: string;
      query?: string | Record<string, string | number | boolean>;
    }
  ) => Record<string, () => Promise<T>>;
}         