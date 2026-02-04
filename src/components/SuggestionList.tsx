import { SugestionData } from "../interfaces/stats";
import { useEffect, useRef } from "react";
type SuggestionListProps = {
  suggestionArr: SugestionData[];
  searchValue: React.RefObject<string | null> | null;
  ulRef: React.RefObject<HTMLUListElement | null>;
  activeIndex: number;
  handleSubmit: (
    e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLElement>,
    flag: boolean,
  ) => void;
};

export default function SuggestionList({
  suggestionArr,
  searchValue,
  ulRef,
  activeIndex,
  handleSubmit,
}: SuggestionListProps) {
  return (
    <ul
      ref={ulRef}
      className="flex absolute -bottom-1 left-0 translate-y-full flex-col w-full bg-white z-50"
    >
      {suggestionArr &&
        suggestionArr.map((item: SugestionData, index: number) => {
          return (
            <li
              key={index}
              role="option"
              aria-selected={activeIndex === index}
              tabIndex={-1}
              onClick={(e) => {
                searchValue!.current = item.name;
                handleSubmit(e, true);
              }}
              onMouseEnter={(e) => {
                searchValue!.current = e.currentTarget.textContent;
              }}
              onMouseLeave={() => {
                searchValue!.current = "";
              }}
              className={`${activeIndex === index ? "bg-[#E7E7E7]" : "bg-white hover:bg-[#E7E7E7]"} pl-3 py-2 text-black hover:cursor-pointer hover:bg-[#E7E7E7] transition-all duration-300 ease-out`}
            >
              {item.name}
            </li>
          );
        })}
    </ul>
  );
}
