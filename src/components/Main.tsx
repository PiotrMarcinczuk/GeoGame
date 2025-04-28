import CustomInput from "./CustomInput";
import Country from "./Country";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCorrectCountry } from "../utils/http";
import { setCorrectCountry } from "../counters/correctCountrySlice";
import { setCountriesList } from "../counters/countriesListSlice";
import { set } from "@dotenvx/dotenvx";
function Main() {
  const data = useSelector((state: any) => state.country);
  const countries = useSelector((state: any) => state.countries);
  const [tempCountriesList, setTempCountriesList] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const res = async () => {
      const data = await fetchCorrectCountry();
      dispatch(setCorrectCountry(data));
    };
    res();
  }, []);

  useEffect(() => {
    if (data) {
      setTempCountriesList((prev: any) => [...prev, data]);
    }
  }, [data]);

  useEffect(() => {
    dispatch(setCountriesList(tempCountriesList));
  }, [tempCountriesList]);
  return (
    <>
      <header></header>
      <main className="max-w-1450 mx-auto">
        <CustomInput />
        {countries
          ? countries.map((country: any, index: number) => {
              return (
                <Country
                  key={index}
                  country={country}
                  isFirst={index === 0 ? true : false}
                />
              );
            })
          : null}
      </main>
    </>
  );
}

export default Main;
