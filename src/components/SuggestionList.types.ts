import { SugestionData } from "../interfaces/shared.types";

export type SuggestionListProps = {
  suggestionArr: SugestionData[];
  searchValue: React.RefObject<string | null> | null;
  ulRef: React.RefObject<HTMLUListElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  activeIndex: number;
  handleSubmit: (
    e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLElement>,
    flag: boolean,
  ) => void;
};
