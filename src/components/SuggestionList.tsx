import { SugestionData } from "../interfaces/stats";
import { useRef } from "react";
type SuggestionListProps = {
  suggestionArr: SugestionData[];
  searchValue: React.RefObject<string | null> | null;
  handleSubmit: (
    e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLElement>,
  ) => void;
};

export default function SuggestionList({
  suggestionArr,
  searchValue,
  handleSubmit,
}: SuggestionListProps) {
  const currentActive = useRef<null | string>(null);
  return (
    <ul className="flex absolute -bottom-1 left-0 translate-y-full flex-col w-full bg-white z-50">
      {suggestionArr &&
        suggestionArr.map((item: SugestionData, index: number) => {
          return (
            <li
              key={index}
              role="button"
              onClick={(e) => {
                searchValue!.current = item.name;
                handleSubmit(e);
              }}
              onMouseEnter={() => {
                currentActive.current = item.name;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && currentActive.current == item.name) {
                  searchValue!.current = item.name;
                  handleSubmit(e);
                }
              }}
              className="pl-3 py-2 bg-white text-black hover:cursor-pointer hover:bg-[#E7E7E7] transition-all duration-300 ease-out"
            >
              {item.name}
            </li>
          );
        })}
    </ul>
  );
}
