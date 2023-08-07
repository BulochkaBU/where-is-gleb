import { useState, useEffect } from "react";
import Location from "./Location";
import Car from "./Car";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="promo">
          <h1 className="title">🕵️‍♂️ Where is Gleb? </h1>
          <Car />
          <h5 className="subtitle">Code by Anastasiia Prudinskaia</h5>
        </div>
      ) : (
        <div>
          <Location />
        </div>
      )}
    </>
  );
}

export default App;
