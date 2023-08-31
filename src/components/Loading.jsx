import { useEffect, useState } from "react";
import Car from "./Car";
import { phrases } from "../const/phrases";

export default function Loading() {
  const [percentage, setPercentage] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (percentage % 10 === 0) {
      setMessage(phrases[Math.floor(Math.random() * 29)]);
    }

    if (percentage < 150) {
      const timer = setTimeout(() => {
        setPercentage(percentage + 1);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [percentage]);

  return (
    <div className="loading">
      <h1 className="title">🕵️‍♂️ Where is Gleb? </h1>
      <Car />
      <div className="percentage">{percentage >= 99 ? 99 : percentage}%</div>
      <div className="message">{message}</div>
      <h5 className="subtitle">Code by Anastasiia Prudinskaia</h5>
    </div>
  );
}
