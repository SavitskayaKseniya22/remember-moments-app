import { ActionFunctionArgs, redirect } from "react-router-dom";
import { formatDataToSend } from "../utils";
import signUp, { signIn } from "./apiService";

export async function loginAction({ request }: ActionFunctionArgs) {
  const storage = window.localStorage;
  const formData = await request.formData();
  const dataToSend = formatDataToSend(formData);
  const result = await signIn(dataToSend);

  if (result.idToken) {
    storage.setItem(
      "activeUser",
      JSON.stringify({
        email: result.email,
        token: result.idToken,
      }),
    );
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
      return redirect("/board");
    }
  }
  return null;
}
