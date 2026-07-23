declare module 'react-devtools-core' {
  export function connectToDevTools(options?: {
    host?: string;
    port?: number;
    isAppActive?: () => boolean;
    websocket?: any;
  }): void;
}
