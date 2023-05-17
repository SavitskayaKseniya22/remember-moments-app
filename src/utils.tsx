export function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return { hours, minutes, seconds };
}

function formatNumber(number: number) {
  const string = `000000${String(number)}`;
  return string.slice(-2);
}

export function formatTime(time: { [key: string]: number }) {
  const formattedTime: { [key: string]: string } = {
    hours: "0",
    minutes: "0",
    seconds: "0",
  };

  Object.keys(time).forEach((item: string) => {
    formattedTime[item] = formatNumber(time[item]);
  });

  return formattedTime;
}

export function checkLS(key: string) {
  const storage = window.localStorage;
  return storage.getItem(key);
}

export function formatDataToSend(data: FormData) {
  return {
    email: String(data.get("email")),
    password: String(data.get("password")),
    returnSecureToken: true,
  };
}

export function IsItDay() {
  const hours = new Date().getHours();
  if (hours < 12) {
    return true;
  }
  return false;
}
