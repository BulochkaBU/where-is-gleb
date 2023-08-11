import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { YMaps, Map, GeoObject, Placemark } from "@pbe/react-yandex-maps";
import {
  useGetCurrentLocationQuery,
  useGetLocationByIdQuery,
} from "./api/apiSlice";
import {
  addLocation,
  addCurrentLocation,
  addArrayIds,
} from "./api/locationSlice";
import Loading from "./Loading";

export default function Location() {
  const { allLocations, currentLocation, arrayIds } = useSelector(
    (state) => state.locations
  );
  const { data, isLoading: isLoadingCurrentLocation } =
    useGetCurrentLocationQuery();
  const [currentId, setCurrentId] = useState(3270);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    data: dataById,
    isSuccess,
    isLoadingLocationById,
  } = useGetLocationByIdQuery({
    id: arrayIds[currentIndex] || 3200,
  });

  const dispatch = useDispatch();

  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (data) {
      dispatch(addCurrentLocation(data[0]));
    }
    if (currentId % 100 === 0) {
      dispatch(addArrayIds(currentId));
    }

    if (data && currentId !== 99) {
      const timeoutId = setTimeout(() => {
        setCurrentId((prev) => prev - 1);
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
      if (currentId === 99) {
        setShowLoading(false);
      }
    }
  }, [dataById, currentIndex, arrayIds, dispatch, isSuccess]);

  if (showLoading || isLoadingCurrentLocation || isLoadingLocationById) {
    return <Loading />;
  }

  return (
    <>
      <YMaps>
        <Map
          defaultState={{
            center: currentLocation[0],
            zoom: 10,
          }}
          width="100%"
          height="80vh"
        >
          <Placemark
            geometry={currentLocation[0]}
            options={{
              iconLayout: "default#image",
              iconImageHref: "./car.svg",
              iconImageSize: [70, 70],
              iconImageOffset: [-15, -42],
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
    </>
  );
}
