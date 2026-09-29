import { useState, type FocusEvent, type KeyboardEvent } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import { SEARCH_TYPES, type SearchType } from "../../utils/search";
import "./SearchTypeMenu.css";

type SearchTypeMenuProps = {
  value: SearchType;
  onChange: (type: SearchType) => void;
};

const SearchTypeMenu = ({ value, onChange }: SearchTypeMenuProps) => {
  const [open, setOpen] = useState(false);

  const select = (type: SearchType) => {
    onChange(type);
    setOpen(false);
  };

  const closeOnFocusOutside = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  };

  const closeOnEscape = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") setOpen(false);
  };

  return (
    <div
      className="search-type-menu"
      onBlur={closeOnFocusOutside}
      onKeyDown={closeOnEscape}
    >
      <button
        type="button"
        className="search-type-menu-trigger"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Tipo de búsqueda: ${SEARCH_TYPES[value].label}`}
      >
        {SEARCH_TYPES[value].label}
        <FaChevronDown className="search-type-menu-chevron" aria-hidden="true" />
      </button>

      {open && (
        <ul className="search-type-menu-list">
          {(Object.keys(SEARCH_TYPES) as SearchType[]).map((type) => {
            const { label, icon: Icon } = SEARCH_TYPES[type];
            return (
              <li key={type}>
                <button
                  type="button"
                  className="search-type-menu-option"
                  onClick={() => select(type)}
                  aria-pressed={type === value}
                >
                  <Icon className="search-type-menu-icon" aria-hidden="true" />
                  {label}
                  {type === value && (
                    <FaCheck
                      className="search-type-menu-check"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchTypeMenu;
