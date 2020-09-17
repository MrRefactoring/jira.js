export interface Config {
  host: string;
  timeout?: number;
  strictGDPR?: boolean;
  authentication?: {
    jwt?: {
      iss: string;
      secret: string;
      expiryTimeSeconds?: number;
    };
    accessToken?: string;
    basic?: {
      username: string;
      apiToken?: string;
      password?: string;
    };
  };
  globalHandlers?: {
    error?: (error: any) => void;
    response?: (data: any) => any;
  };
}
