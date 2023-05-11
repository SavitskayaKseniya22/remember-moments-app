import { ActionFunctionArgs, redirect } from "react-router-dom";
import { formatDataToSend } from "../utils";
import signUp, { getUserData, signIn } from "./apiService";

export async function loginAction({ request }: ActionFunctionArgs) {
  const storage = window.localStorage;
  const formData = await request.formData();
  const dataToSend = formatDataToSend(formData);
  const resultSignIn = await signIn(dataToSend);

  if (resultSignIn.idToken) {
    storage.setItem(
      "activeUser",
      JSON.stringify({
        email: resultSignIn.email,
        token: resultSignIn.idToken,
      }),
    );
    const resultGetUserData = await getUserData(resultSignIn.idToken);
    if (!resultGetUserData.error) {
      storage.setItem("activeUserData", JSON.stringify(resultGetUserData));
    }

    return redirect("/board");
  }
  return null;
}

export async function regAction({ request }: ActionFunctionArgs) {
  const storage = window.localStorage;
  const formData = await request.formData();
  const dataToSend = formatDataToSend(formData);
  const resultSignUp = await signUp(dataToSend);
  if (resultSignUp.idToken) {
    const resultSignIn = await signIn(dataToSend);
    if (resultSignIn.idToken) {
      storage.setItem(
        "activeUser",
        JSON.stringify({
          email: resultSignIn.email,
          token: resultSignIn.idToken,
        }),
      );
      const resultGetUserData = await getUserData(resultSignIn.idToken);
      if (!resultGetUserData.error) {
        storage.setItem("activeUserData", JSON.stringify(resultGetUserData));
      }
      return redirect("/board");
    }
  }
  return null;
}
