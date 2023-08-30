import { YMaps, Map, GeoObject, Placemark } from "@pbe/react-yandex-maps";

import Loading from "./Loading";
import { useLocationData } from "../hooks/useLocationData";

export default function Location() {
  const { listСoordinates, currentСoordinate, isLoading } = useLocationData();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <YMaps
      query={{
        apikey: import.meta.env.VITE_YANDEX_MAPS_API_KEY,
      }}
    >
      <Map
        defaultState={{
          center: currentСoordinate,
          zoom: 8,
        }}
        width="100%"
        height="100vh"
      >
        <Placemark
          geometry={currentСoordinate}
          options={{
            iconLayout: "default#image",
            iconImageHref: "./marker.png",
            iconImageSize: [50, 50],
            iconImageOffset: [-25, -40],
          }}
        />
        <GeoObject
          geometry={{
            type: "LineString",
            coordinates: listСoordinates,
          }}
          options={{
            geodesic: true,
            strokeWidth: 5,
            strokeColor: "#F008",
          }}
        />
      </Map>
    </YMaps>
  );
}
