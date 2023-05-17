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
export function signoutLoader() {
  const storage = window.localStorage;
  storage.removeItem("activeUser");
  storage.removeItem("userData");
  return redirect("/auth");
}

export function userLoader() {
  const storage = window.localStorage;
  const storedActiveUser = storage.getItem("activeUser");
  const activeUser = storedActiveUser ? JSON.parse(storedActiveUser) : null;
  const storedUserData = storage.getItem("userData");
  const userData = storedUserData ? JSON.parse(storedUserData) : null;
  return { activeUser, userData };
}
