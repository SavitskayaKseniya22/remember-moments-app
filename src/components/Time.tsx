import React, { useState } from "react";
import { formatTime, getTime } from "../utils";

export default function Time() {
  const [time, setTime] = useState(formatTime(getTime()));

  setInterval(() => {
    const newTime = formatTime(getTime());
    setTime(newTime);
  }, 1000);

  return (
    <div>
      {time.hours}:{time.minutes}:{time.seconds}
    </div>
  );
}
