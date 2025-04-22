import arrow from "../assets/img/arrow.png";
import { useState } from "react";
export default function CustomInput() {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(searchValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onClick={(e: any) => {
        e.target.value = "";
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSubmit(e);
        }
      }}
      className="mt-10 w-full mx-auto max-w-[812px] relative">
      <input
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
