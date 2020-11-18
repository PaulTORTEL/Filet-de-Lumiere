export interface TokenUser {
   tokens: {
      accessToken: string,
      refreshToken: string
   };
   user: {
      id: number,
      username: string
   };
}

export interface DecodedAuthJwt {
   user: string;
   iat: number;
   exp: number;
}
