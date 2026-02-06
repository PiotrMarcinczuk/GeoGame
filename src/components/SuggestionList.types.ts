import { SugestionData } from "../interfaces/shared.types";

export type SuggestionListProps = {
  suggestionArr: SugestionData[];
  searchValue: string | null;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  ulRef: React.RefObject<HTMLUListElement | null>;
  activeIndex: number;
  handleSubmit: (
    e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLElement>,
    forcedValue?: string,
  ) => void;
};
