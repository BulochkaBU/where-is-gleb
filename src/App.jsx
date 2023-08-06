import { useState, useEffect } from "react";
import Location from "./Location";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <div
          style={{
            width: "100vw",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#00bfff",
          }}
        >
          <h1
            style={{
              fontSize: "4rem",
              color: "#000",
              textAlign: "center",
            }}
          >
            Where is Gleb...
          </h1>
        </div>
      ) : (
        <div>
          <h2
            style={{
              fontSize: "2rem",
              color: "#00bfff",
              textAlign: "center",
            }}
          >
            Я тут
          </h2>
          <Location />
        </div>
      )}
    </div>
  );
}

export default App;
