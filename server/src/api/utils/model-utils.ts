export interface TokenUser {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: {
    id: number;
    username: string;
  };
}
