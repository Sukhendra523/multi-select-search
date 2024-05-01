import React, { useEffect, useRef, useState } from "react";
import useClickAway from "../Hooks/useClickAway";

const MultiSelectSearch = ({ searchFunc, PillComponent }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPills, setSelectedPills] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showSuggestionList, setShowSuggestionList] = useState(false);
  const searchContainerRef = useRef();
  const searchInputRef = useRef();


  const searchHandler = async () => {
    const response = await searchFunc(searchTerm);
    if (response) {
      setSuggestions(response);
      setShowSuggestionList(true);
    }
  };

  useEffect(() => {
    if (!searchTerm) {
      setSuggestions([]);
      setShowSuggestionList(false);
      return;
    }
    if (searchTerm) {
      searchHandler();
    }
  }, [searchTerm]);

  const onChangeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const suggestionHandler = (newPill) => {
    setActiveSuggestion(0);
    setSearchTerm("");
    setSuggestions([]);
    setSelectedPills([...selectedPills, newPill]);
  };

  const removePillHandler = (pillTobeRemoved) => {
    const updatedPills = selectedPills.filter(
      (pill) => pill.email !== pillTobeRemoved.email
    );
    setSelectedPills(updatedPills);
  };


  const onClickAway = () => {
    setShowSuggestionList(false);
  };

  const onFocusHandler = () => {
    if (suggestions.length) {
      setShowSuggestionList(true);
    }
  };
  useClickAway({
    elementRef: searchContainerRef,
    onClickAway,
  });

  const onClickSearchContainer= ()=>{
    searchInputRef.current.focus();
  }

  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedPills.length > 0
    ) {
      const lastUser = selectedPills[selectedPills.length - 1];
      removePillHandler(lastUser);
      setSuggestions([]);
    } else if (e.key === "ArrowDown" && suggestions?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp" && suggestions?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (
      e.key === "Enter" &&
      activeSuggestion >= 0 &&
      activeSuggestion < suggestions.length
    ) {
      suggestionHandler(suggestions[activeSuggestion]);
    }
  };

  return (
    <div className="user-search-container" ref={searchContainerRef} onClick={onClickSearchContainer}>
      <div className="user-search-input">
        {selectedPills.map((pill) => {
          return (
            <PillComponent
              pill={pill}
              removePillHandler={removePillHandler}
            />
          );
        })}
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={onChangeHandler}
            onFocus={onFocusHandler}
            placeholder="Search For a User..."
            ref={searchInputRef}
            onKeyDown={handleKeyDown}
          />

          {!!suggestions.length && showSuggestionList && (
            <ul className="suggestions-list">
              {suggestions.map((suggestionsOption,index) =>
                !selectedPills.find(
                  (pills) => pills.email == suggestionsOption.email
                ) ? (
                  <li key={suggestionsOption.email} 
                  className={index === activeSuggestion ? "active" : ""}
                  onClick={() => suggestionHandler(suggestionsOption)}
                  >
                    <img
                      src={suggestionsOption.image}
                      alt={`${suggestionsOption.firstName} ${suggestionsOption.lastName}`}
                    />
                    <span>
                      {suggestionsOption.firstName} {suggestionsOption.lastName}
                    </span>
                  </li>
                ) : (
                  <></>
                )
              )}
            </ul>
          )}
        </div>
      </div>

      {/* Search Suggestion */}
    </div>
  );
};

export default MultiSelectSearch;
