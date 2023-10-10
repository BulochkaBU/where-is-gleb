import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCurrentLocationQuery, useGetLocationByIdQuery } from "../api/apiSlice";
import { addLocation, addCurrentLocation, addArrayIds } from "../api/locationSlice";

export const useLocationData = () => {
  const { allLocations, currentLocation, arrayIds, currentId } = useSelector((state) => state.locations);
  const { data, isLoading: isLoadingCurrentLocation } = useGetCurrentLocationQuery();
  const [lastId, setLastId] = useState(49000);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    data: dataById,
    isSuccess,
    isLoadingLocationById,
  } = useGetLocationByIdQuery({
    id: arrayIds[currentIndex] || lastId,
  });
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(true);
  const [listСoordinates, setListСoordinates] = useState(null);

  useEffect(() => {
    if (currentId) {
      setLastId(Math.floor(currentId / 1000) * 1000);
    }
  }, [currentId]);

  useEffect(() => {
    if (data) {
      dispatch(addCurrentLocation(data[0]));

      if (currentId != null) {
        dispatch(addArrayIds(currentId));
      }

      if (lastId % 1000 === 0 && lastId >= 50000 && lastId != 49000 && arrayIds && arrayIds.length != 51) {
        dispatch(addArrayIds(lastId));
      }

      if (lastId >= 50000 && arrayIds && arrayIds.length != 51) {
        const timeoutId = setTimeout(() => {
          setLastId((prev) => prev - 1000);
        }, 1000);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [data, lastId]);

  useEffect(() => {
    if (dataById && arrayIds && arrayIds.length != 51 && lastId >= 50000 && lastId != 49000) {
      dispatch(addLocation(dataById[0]));
    }

    if (arrayIds && currentIndex < arrayIds.length - 1 && isSuccess) {
      setCurrentIndex((prev) => prev + 1);
    }

    if ((lastId <= 50000 && lastId != 49000 && allLocations) || (arrayIds && arrayIds.length === 51)) {
      setShowLoading(false);
      setListСoordinates(allLocations);
    }
  }, [lastId]);

  const isLoading = showLoading || isLoadingCurrentLocation || isLoadingLocationById;
  const currentСoordinate = currentLocation ? currentLocation[0] : null;

  return { listСoordinates, currentСoordinate, isLoading };
};
