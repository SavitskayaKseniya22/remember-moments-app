export interface TimeTypes {
  hours: number;
  minutes: number;
  seconds: number;
  [key: string]: number;
}

export interface UserContextType {
  users: [
    {
      localId: string;
      email: string;
      emailVerified: boolean;
      displayName: string;
      providerUserInfo: [
        {
          providerId: string;
          displayName: string;
          photoUrl: string;
          federatedId: string;
          email: string;
          rawId: string;
          screenName: string;
        },
      ];
      photoUrl: string;
      passwordHash: string;
      passwordUpdatedAt: number;
      validSince: string;
      disabled: boolean;
      lastLoginAt: string;
      createdAt: string;
      customAuth: boolean;
    },
  ];
}
