import { useRef } from "react";
import "./FilteringPopup.css";

const FilteringPopup = ({
  grouping,
  SetGrouping,
  ordering,
  SetOrdering,
  SetFilteringPopup,
  openref,
  sortfunction,
}) => {
  const popupRef = useRef(null);

  const handleDocumentClick = (e) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(e.target) &&
      !openref.current.contains(e.target)
    ) {
      SetFilteringPopup(false);
    }
  };
  document.addEventListener("click", handleDocumentClick);

  return (
    <div className="filteringpopup" ref={popupRef}>
      <div className="fildiv">
        <p className="fil">Grouping</p>
        <select
          className="selectopt"
          name="groupingfilter"
          id="groupingfilter"
          value={grouping}
          onChange={(e) => {
            SetGrouping(e.target.value);
          }}
        >
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div className="fildiv">
        <p className="fil">Ordering</p>
        <select
          className="selectopt"
          name="orderingfilter"
          id="orderingfilter"
          value={ordering}
          onChange={(e) => {
            SetOrdering(e.target.value);
            sortfunction(e.target.value);
          }}
        >
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default FilteringPopup;
