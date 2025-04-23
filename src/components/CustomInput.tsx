import arrow from "../assets/img/arrow.png";
import { useRef, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchData from "../utils/http";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { setCountryData } from "../counters/countrySlice";
import { set } from "@dotenvx/dotenvx";
export default function CustomInput() {
  const searchValue = useRef<string | null>("");
  const [searchTerm, setSearchTerm] = useState<string | null>();

  const dispatch = useDispatch();
  const dataR = useSelector((state: any) => state.country);

  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: ["countries"],
    queryFn: () => fetchData(searchTerm),
    enabled: !!searchTerm,
  });

  useEffect(() => {
    console.log(result.data);
    if (result.data) dispatch(setCountryData(result.data));
  }, [result.data]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchValue.current = event.target.value;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchTerm(searchValue.current);
  };

  console.log(searchTerm);
  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSubmit(e);
        }
      }}
      className="mt-10 w-full mx-auto max-w-[812px] relative">
      <input
        onClick={(e: any) => {
          if (searchValue.current == "Wpisz nazwe państwa") {
            e.target.value = "";
          }
        }}
        className={`w-full h-20 rounded-[4rem] outline-0 bg-white text-4xl p-4 ${
          searchValue ? "text-black" : "text-gray-500"
        }`}
        onChange={handleChange}
        defaultValue={"Wpisz nazwe państwa"}
      />
      <button className="absolute bg-[#DED9D9] right-3 bottom-1/2 translate-y-1/2  w-16 h-16 rounded-full">
        <img src={arrow} alt="arrow" className="mx-auto" />
      </button>
    </form>
  );
}
