import CustomInput from "./CustomInput";
import Country from "./Country";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCorrectCountry } from "../utils/http";
import { setCorrectCountry } from "../counters/correctCountrySlice";
function Main() {
  const data = useSelector((state: any) => state.country);
  const [countryList, setCountryList] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const res = async () => {
      const data = await fetchCorrectCountry();
      console.log("Correct country data:", data);
      dispatch(setCorrectCountry(data));
    };
    res();
  }, []);

  useEffect(() => {
    if (data) {
      setCountryList((prev: any) => [...prev, data]);
    }
  }, [data]);
  return (
    <>
      <header></header>
      <main className="max-w-1450 mx-auto">
        <CustomInput />
        {countryList.length > 0
          ? countryList.map((country: any, index: number) => {
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
