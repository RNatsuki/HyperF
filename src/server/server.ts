

export interface Server {
   start(port: number, callback: () => void): void;
  stop(): void;
}