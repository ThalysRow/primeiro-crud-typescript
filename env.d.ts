declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_PASS: string;
    }
  }
}

export {};
