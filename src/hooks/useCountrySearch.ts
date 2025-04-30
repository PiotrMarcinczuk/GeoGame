import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchData from "../utils/http";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCountryData } from "../counters/countrySlice";
import { setLoading } from "../counters/loadingSlice";

export default function useCountrySearch(
  searchTerm: string | null,
  setSearchTerm: any
) {
  console.log(searchTerm);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { data, isPending, isError, error }: any = useQuery({
    queryKey: ["countries", searchTerm],
    queryFn: () => fetchData(searchTerm || null),
    enabled: !!searchTerm,
  });

  useEffect(() => {
    if (data) dispatch(setCountryData(data));
    dispatch(setLoading({ loading: isPending }));
    setSearchTerm(null);
  }, [data, isPending, dispatch]);

  return { data, isPending, isError, error };
}
