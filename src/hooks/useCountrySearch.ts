import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchData from "../utils/http";
import { useEffect } from "react";
import { useAppDispatch } from "./useReduxType";
import { setCountryData } from "../counters/countrySlice";
import { incrementCountOfAttempt } from "../counters/countOfAttempSlice";
import { setLoading } from "../counters/loadingSlice";

export default function useCountrySearch(
  searchTerm: string | null,
  setSearchTerm: string | null | any,
) {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { data, isPending, isFetching, isError, error }: any = useQuery({
    queryKey: ["countries", searchTerm],
    queryFn: () => fetchData(searchTerm || null),
    enabled: !!searchTerm,
  });

  useEffect(() => {
    if (data) {
      dispatch(setCountryData(data));
      dispatch(incrementCountOfAttempt());
      setSearchTerm(); // propably not needed, but just in case
    }

    setSearchTerm(null);
  }, [data, dispatch, setSearchTerm]);

  useEffect(() => {
    dispatch(setLoading(isFetching));
  }, [isFetching, dispatch]);

  return { data, isFetching, isError, error };
}
