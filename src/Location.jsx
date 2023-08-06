import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

import { useEffect, useState } from "react";

export default function Location() {
  const [location, setLocation] = useState(null);
  const [defaultState, setDefaultState] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(import.meta.env.VITE_URL, {
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_TOKEN,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDefaultState({
          center: [data[0].latitude, data[0].longitude],
          zoom: 10,
        });
        setLocation(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (!location) return <div>Loading...</div>;
  if (error) return <div>Something went wrong...</div>;

  return (
    <YMaps>
      <Map defaultState={defaultState} width="100vw" height="100vh">
        {location.map((item) => (
          <Placemark geometry={[item.latitude, item.longitude]} key={item.id} />
        ))}
      </Map>
    </YMaps>
  );
}
