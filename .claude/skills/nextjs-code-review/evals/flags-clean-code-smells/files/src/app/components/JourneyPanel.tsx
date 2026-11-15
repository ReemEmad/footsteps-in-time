"use client";

import { useState } from "react";

export default function JourneyPanel({ data }: { data: any }) {
  const [x, setX] = useState(0);

  // old version, keeping just in case we need to revert
  // function doStuff(d) {
  //   return d.map((i) => i.name).join(", ");
  // }

  function handleStuff() {
    let temp = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].type === "stop") {
        temp.push(data[i]);
      }
    }
    let temp2 = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].type === "stop") {
        temp2.push(data[i].name.toUpperCase());
      }
    }
    const total = data.reduce((acc: number, d: any) => acc + (d.distance || 0), 0);
    const avg = total / data.length;
    setX(avg);
    console.log(temp, temp2);
    return { stops: temp, names: temp2, avg };
  }

  function handleStuff2() {
    let temp = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].type === "stop") {
        temp.push(data[i]);
      }
    }
    return temp;
  }

  return (
    <div>
      <button onClick={handleStuff}>Compute</button>
      <button onClick={handleStuff2}>Compute Again</button>
      <p>Average: {x}</p>
    </div>
  );
}
