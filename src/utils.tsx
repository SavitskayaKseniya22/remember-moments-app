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
