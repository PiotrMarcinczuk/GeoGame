import { useState } from "react";
import CustomInput from "./CustomInput";
import Country from "./Country";
import fetchData from "../utils/http";
import useStats from "../hooks/useStats";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";

function Main() {
  const [count, setCount] = useState(0);

  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: ["countries"],
    queryFn: fetchData,
  });

  const { stats, setStats } = useStats({ data: result.data });

  return (
    <>
      <header></header>
      <main className="max-w-1450 mx-auto">
        <CustomInput />
        <Country />
      </main>
    </>
  );
}

export default Main;
