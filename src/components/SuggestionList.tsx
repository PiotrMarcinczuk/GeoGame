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
    <ul className="flex flex-col w-full bg-red-200 z-50">
      {suggestionArr &&
        suggestionArr.map((item: SugestionData, index: number) => {
          return (
            <li
              key={index}
              onClick={(e) => {
                searchValue!.current = item.name_pl;
                handleSubmit(e);
              }}
              className="mt-6 bg-white text-black hover:cursor-pointer hover:bg-[#E7E7E7] transition-all duration-300 ease-out"
            >
              {item.name_pl}
            </li>
          );
        })}
    </ul>
  );
}
