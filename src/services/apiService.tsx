import firebaseConfig from "./firebase";

async function signUp(data: {
  email: string;
  password: string;
  returnSecureToken: boolean;
}) {
  const key = firebaseConfig.apiKey;
  const response: Response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    },
  );
  const result = await response.json();
  return result;
}

export default signUp;

export async function signIn(data: {
  email: string;
  password: string;
  returnSecureToken: boolean;
}) {
  const key = firebaseConfig.apiKey;
  const response: Response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    },
  );
  const result = await response.json();

  return result;
}

export async function getUserData(token: string) {
  const key = firebaseConfig.apiKey;
  const response: Response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${key}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ idToken: token }),
    },
  );
  const result = await response.json();

  return result;
}
