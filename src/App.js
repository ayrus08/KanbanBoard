import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { LuSettings2 } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { AiOutlineDash } from "react-icons/ai";
import "./App.css";
import FilteringPopup from "./Components/FilteringPopup";
import KanbanBoard from "./Components/KanbanBoard";

function App() {
  const openref = useRef(null);

  const storedgroupingState =
    JSON.parse(localStorage.getItem("storedgroupingState")) || "status";
  const storedorderingState =
    JSON.parse(localStorage.getItem("storedorderingState")) || "priority";

  let [grouping, SetGrouping] = useState(storedgroupingState);
  let [ordering, SetOrdering] = useState(storedorderingState);

  useEffect(() => {
    localStorage.setItem("storedgroupingState", JSON.stringify(grouping));
  }, [grouping]);

  useEffect(() => {
    localStorage.setItem("storedorderingState", JSON.stringify(ordering));
  }, [ordering]);

  let [tickets, SetTickets] = useState([]);
  let [allunqusers, setAllunqusers] = useState([]);
  let [users, SetUsers] = useState([]);
  let [filteringpopup, SetFilteringPopup] = useState(false);

  const getunquser = (array) => {
    const uniqueUserIds = [];

    array.forEach((kandancard) => {
      if (!uniqueUserIds.includes(kandancard.userId)) {
        uniqueUserIds.push(kandancard.userId);
      }
    });
    setAllunqusers(uniqueUserIds);
  };

  let allStatus = ["Backlog", "Todo", "In progress", "Done", "Canceled"];
  let proritylevels = [0, 4, 3, 2, 1];
  useEffect(() => {
    axios
      .get(" https://api.quicksell.co/v1/internal/frontend-assignment ")
      .then((res) => {
        getunquser(res.data.tickets);
        SetTickets(
          ordering === "priority"
            ? res.data.tickets.sort((a, b) => b.priority - a.priority)
            : res.data.tickets.sort((a, b) => {
                const nameA = a.title.toUpperCase(); // ignore case
                const nameB = b.title.toUpperCase(); // ignore case

                if (nameA < nameB) {
                  return -1; // a should come before b
                }
                if (nameA > nameB) {
                  return 1; // a should come after b
                }
                return 0; // names are equal
              })
        );
        SetUsers(res.data.users);
      })
      .catch((error) => console.log(error));
  }, []);
  const sortfunction = (order) => {
    if (order === "priority") {
      let k = [];
      k = tickets.sort((a, b) => b.priority - a.priority);

      SetTickets(() => [...k]);
    } else if (order === "title") {
      let k = [];
      k = tickets.sort((a, b) => {
        const nameA = a.title.toUpperCase(); // ignore case
        const nameB = b.title.toUpperCase(); // ignore case

        if (nameA < nameB) {
          return -1; // a should come before b
        }
        if (nameA > nameB) {
          return 1; // a should come after b
        }
        return 0; // names are equal
      });
      SetTickets(() => [...k]);
    }
  };
  return (
    <div>
      <div className="filterdiv">
        <div
          className="displayfilter"
          ref={openref}
          onClick={() => {
            SetFilteringPopup(true);
          }}
        >
          <LuSettings2 />
          <p>Display</p>
          <IoIosArrowDown />
        </div>
        {filteringpopup && (
          <FilteringPopup
            grouping={grouping}
            SetGrouping={SetGrouping}
            ordering={ordering}
            SetOrdering={SetOrdering}
            SetFilteringPopup={SetFilteringPopup}
            openref={openref}
            sortfunction={sortfunction}
          />
        )}
      </div>
      <div className="kanban">
        {grouping === "status" && (
          <KanbanBoard
            allcolums={allStatus}
            tickets={tickets}
            filterkey={"status"}
          />
        )}
        {grouping === "priority" && (
          <KanbanBoard
            allcolums={proritylevels}
            tickets={tickets}
            filterkey={"priority"}
          />
        )}
        {grouping === "user" && (
          // <>
          //   {allunqusers.map((e) => (
          //     <div className="perstatus">
          //       <div className="nameandfunc">
          //         <div className="statusandnum">
          //           <span>{e}</span>
          //           <span className="tktid">
          //             {tickets.filter((tkt) => tkt.userId === e).length}
          //           </span>
          //         </div>
          //         <div className="plusanddots">
          //           <span>
          //             <FaPlus color="grey" />
          //           </span>
          //           <span>
          //             <BsThreeDots color="grey" />
          //           </span>
          //         </div>
          //       </div>
          //       <div className="allcardsdiv">
          //         {tickets
          //           .filter((tkt) => tkt.userId === e)
          //           .map((tkts) => (
          //             <div className="card">
          //               <div>
          //                 <div>
          //                   <span className="tktid">{tkts.id}</span>
          //                   {/* <img src="" alt="" /> */}
          //                 </div>
          //                 <div className="title">{tkts.title}</div>
          //               </div>
          //               <div className="tags">
          //                 <div className="dashdashdash">
          //                   <AiOutlineDash />
          //                 </div>
          //                 {tkts.tag.map((t) => (
          //                   <div className="tag">
          //                     <div className="dot">
          //                       <GoDotFill />
          //                     </div>
          //                     <span>{t}</span>
          //                   </div>
          //                 ))}
          //               </div>
          //             </div>
          //           ))}
          //       </div>
          //     </div>
          //   ))}
          // </>
          <KanbanBoard
            allcolums={allunqusers}
            tickets={tickets}
            filterkey={"userId"}
            users={users}
          />
        )}
      </div>
    </div>
  );
}

export default App;
