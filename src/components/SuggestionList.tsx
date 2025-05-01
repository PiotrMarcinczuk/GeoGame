import { SugestionData } from "../interfaces/stats";

type SuggestionListProps = {
  suggestionArr: SugestionData[];
  searchValue: React.RefObject<string | null> | null;
  handleSubmit: (e: React.MouseEvent<HTMLLIElement>) => void;
};

export default function SuggestionList({
  suggestionArr,
  searchValue,
  handleSubmit,
}: SuggestionListProps) {
  return (
    <ul className="absolute w-full z-50">
      {suggestionArr &&
        suggestionArr.map((item: SugestionData, index: number) => {
          return (
            <li
              key={index}
              onClick={(e) => {
                searchValue!.current = item.name_pl;
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
