import countries_iso from "../assets/countries_iso.json";

export default function SuggestionList({
  suggestionArr,
  searchValue,
  handleSubmit,
}: any) {
  return (
    <ul className="absolute w-full">
      {suggestionArr &&
        suggestionArr.map((item: any, index: number) => {
          return (
            <li
              key={index}
              onClick={(e) => {
                searchValue.current = item.name_pl;
                handleSubmit(e);
              }}
              className="bg-white text-2xl text-black border-b-2 border-gray-200 p-2 cursor-pointer hover:bg-gray-100">
              {item.name_pl}
            </li>
          );
        })}
    </ul>
  );
}
