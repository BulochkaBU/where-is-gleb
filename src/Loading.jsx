import { useEffect, useState } from "react";
import Car from "./Car";

export default function Loading() {
  const [percentage, setPercentage] = useState(0);
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");

  useEffect(() => {
    if (percentage === 50) {
      setMessage("А ну, малыш, давай! Попробуй отгадай!");
      setMessage2(" Где же, где же, где же, где же...");
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
      <p className="message">
        {message}
        <br />
        {message2}
      </p>
      <h5 className="subtitle">Code by Anastasiia Prudinskaia</h5>
    </div>
  );
}
