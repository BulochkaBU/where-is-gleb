import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { YMaps, Map, GeoObject, Placemark } from "@pbe/react-yandex-maps";
import { useGetCurrentLocationQuery, useGetLocationByIdQuery } from "./api/apiSlice";
import { addLocation, addCurrentLocation, addArrayIds } from "./api/locationSlice";
import Loading from "./Loading";

export default function Location() {
  const { allLocations, currentLocation, arrayIds, currentId } = useSelector((state) => state.locations);
  const { data, isLoading: isLoadingCurrentLocation } = useGetCurrentLocationQuery();
  const [lastId, setLastId] = useState(5160);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    data: dataById,
    isSuccess,
    isLoadingLocationById,
  } = useGetLocationByIdQuery({
    id: arrayIds[currentIndex] || 5160,
  });
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (data) {
      dispatch(addCurrentLocation(data[0]));
    }
  }, [data]);

  useEffect(() => {
    if (data && lastId % 100 === 0) {
      dispatch(addArrayIds(lastId));
    }

    if (data && lastId !== currentId) {
      const timeoutId = setTimeout(() => {
        setLastId((prev) => prev + 1);
      }, 1);

      return () => clearTimeout(timeoutId);
    }
  }, [data, lastId]);

  useEffect(() => {
    if (dataById) {
      dispatch(addLocation(dataById[0]));
      if (arrayIds && currentIndex < arrayIds.length - 1 && isSuccess) {
        setCurrentIndex((prev) => prev + 1);
      }

      if (lastId >= currentId && currentId) {
        setShowLoading(false);
      }
    }
  }, [dataById, currentIndex, arrayIds]);

  if (showLoading || isLoadingCurrentLocation || isLoadingLocationById) {
    return <Loading />;
  }

  return (
    <YMaps>
      <Map
        defaultState={{
          center: currentLocation[0],
          zoom: 8,
        }}
        width="100%"
        height="100vh"
      >
        <Placemark
          geometry={currentLocation[0]}
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
            coordinates: allLocations,
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
