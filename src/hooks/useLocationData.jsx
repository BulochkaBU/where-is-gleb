import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCurrentLocationQuery, useGetLocationByIdQuery } from "../api/apiSlice";
import { addLocation, addCurrentLocation, addArrayIds } from "../api/locationSlice";

export const useLocationData = () => {
  const { allLocations, currentLocation, arrayIds, currentId } = useSelector((state) => state.locations);
  const { data, isLoading: isLoadingCurrentLocation } = useGetCurrentLocationQuery();
  const [lastId, setLastId] = useState(10000);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    data: dataById,
    isSuccess,
    isLoadingLocationById,
  } = useGetLocationByIdQuery({
    id: arrayIds[currentIndex] || 10000,
  });
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(true);
  const [listСoordinates, setListСoordinates] = useState(null);

  useEffect(() => {
    if (data) {
      dispatch(addCurrentLocation(data[0]));
      if (lastId % 1000 === 0 && currentId >= lastId && currentId && arrayIds && arrayIds.length != 51) {
        dispatch(addArrayIds(lastId));
      }
      if (currentId === 0) {
        setLastId((prev) => prev + 1000);
      }

      if (lastId <= currentId && arrayIds && arrayIds.length != 51) {
        const timeoutId = setTimeout(() => {
          setLastId((prev) => prev + 1000);
        }, 1000);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [data, lastId]);

  useEffect(() => {
    if (dataById && arrayIds && arrayIds.length != 51) {
      dispatch(addLocation(dataById[0]));
    }

    if (arrayIds && currentIndex < arrayIds.length - 1 && isSuccess) {
      setCurrentIndex((prev) => prev + 1);
    }

    if ((lastId >= currentId && currentId && allLocations) || (arrayIds && arrayIds.length === 51)) {
      setShowLoading(false);
      setListСoordinates(allLocations);
    }
  }, [lastId]);

  const isLoading = showLoading || isLoadingCurrentLocation || isLoadingLocationById;
  const currentСoordinate = currentLocation ? currentLocation[0] : null;

  return { listСoordinates, currentСoordinate, isLoading };
};
