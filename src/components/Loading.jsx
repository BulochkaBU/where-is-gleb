import { useEffect, useState } from "react";
import Car from "./Car";
import { phrases } from "../const/phrases";

export default function Loading() {
  const [percentage, setPercentage] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (percentage % 10 === 0) {
      setMessage(phrases[Math.floor(Math.random() * 9)]);
    }

    if (percentage < 100 && percentage !== 99) {
      const timer = setTimeout(() => {
        setPercentage(percentage + 1);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [percentage]);

  return (
    <div className="promo">
      <h1 className="title">🕵️‍♂️ Where is Gleb? </h1>
      <Car />
      <div className="percentage">{percentage}%</div>
      <p className="message">{message}</p>
      <h5 className="subtitle">Code by Anastasiia Prudinskaia</h5>
    </div>
  );
}
