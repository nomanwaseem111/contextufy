"use client";

import { Amplify } from "aws-amplify";

export const authConfig = {
  Cognito: {
    userPoolId: "us-east-1_9rsfLueKd",
    userPoolClientId: "45c44in2vrhrr0j011jeihpsrf",
  },
};

Amplify.configure(
  {
    Auth: authConfig,
  },
  { ssr: true }
);

export default function ConfigureAmplifyClientSide() {
  return null;
}
