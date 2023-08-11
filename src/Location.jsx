import { YMaps, Map, GeoObject } from "@pbe/react-yandex-maps";

import { useEffect, useState } from "react";
import {
  useGetCurrentLocationQuery,
  useGetLocationByIdQuery,
} from "./api/apiSlice";
import {
  addLocation,
  addCurrentLocation,
  addArrayIds,
} from "./api/locationSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";

export default function Location() {
  const { allLocations, currentLocation, arrayIds } = useSelector(
    (state) => state.locations
  );
  const { data, isLoading: isLoadingCurrentLocation } =
    useGetCurrentLocationQuery();
  const [currentId, setCurrentId] = useState(100);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    data: dataById,
    isSuccess,
    isLoadingLocationById,
  } = useGetLocationByIdQuery({
    id: arrayIds[currentIndex],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(addCurrentLocation(data[0]));
    }
    if (currentId % 100 === 0) {
      dispatch(addArrayIds(currentId));
    }

    if (data && currentId < data[0].id) {
      const timeoutId = setTimeout(() => {
        setCurrentId((prev) => prev + 1);
      }, 1);

      return () => clearTimeout(timeoutId);
    }
  }, [data, currentId, dispatch]);

  useEffect(() => {
    if (dataById) {
      dispatch(addLocation(dataById[0]));
      if (arrayIds && currentIndex < arrayIds.length - 1 && isSuccess) {
        setCurrentIndex((prev) => prev + 1);
      }
    }
  }, [dataById, currentIndex, arrayIds, dispatch, isSuccess]);

  if (isLoadingCurrentLocation || isLoadingLocationById) {
    return <Loading />;
  }

  return (
    <YMaps>
      <Map
        defaultState={{
          center: currentLocation[0],
          zoom: 10,
        }}
        width="100%"
        height="80vh"
      >
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
