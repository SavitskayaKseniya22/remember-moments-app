import { redirect } from "react-router-dom";
import { checkLS } from "../utils";

export function boardLoaderWithActiveUser() {
  const user = checkLS("activeUser");
  if (user) {
    return redirect("/board");
  }
  return { user };
}

export function boardLoaderWithoutActiveUser() {
  const user = checkLS("activeUser");
  if (!user) {
    return redirect("/");
  }
  return { user };
}
