import { useQuery } from "@tanstack/react-query";
import fetchData from "../utils/http";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./useReduxType";
import { setCountryData } from "../counters/countrySlice";
import { incrementCountOfAttempt } from "../counters/countOfAttempSlice";
import { setLoading } from "../counters/loadingSlice";

export default function useCountrySearch(searchValue: string) {
  const dispatch = useAppDispatch();

  const query = useQuery({
    queryKey: ["countries", searchValue],
    queryFn: () => fetchData(searchValue),
    enabled: !!searchValue,
  });

  useEffect(() => {
    if (query.data) {
      dispatch(setCountryData(query.data));
      dispatch(incrementCountOfAttempt());
    }
  }, [query.data, dispatch]);

  useEffect(() => {
    dispatch(setLoading(query.isFetching));
  }, [query.isFetching, dispatch]);

  return query;
}
