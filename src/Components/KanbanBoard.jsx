import React from "react";
import "./KanbanBoard.css";
import { FaPlus } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { MdOutlineSignalCellularAlt1Bar } from "react-icons/md";
import { MdOutlineSignalCellularAlt2Bar } from "react-icons/md";
import { MdOutlineSignalCellularAlt } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa6";
import { TbCircleDotted } from "react-icons/tb";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { AiFillClockCircle } from "react-icons/ai";
import Card from "./Card";

const KanbanBoard = ({ allcolums, tickets, filterkey, users }) => {
  const btmlefticon = filterkey === "priority" ? "none" : "priority";
  const titleicon = filterkey === "status" ? "none" : "status";
  const prioritymap = ["No Priority", "Low", "Medium", "High", "Urgent"];
  const prioritymapicons = [
    <BsThreeDots color="grey" />,
    <MdOutlineSignalCellularAlt1Bar color="grey" />,
    <MdOutlineSignalCellularAlt2Bar color="grey" />,
    <MdOutlineSignalCellularAlt color="grey" />,
    <AiOutlineExclamationCircle color="orange" />,
  ];
  const statusicons = {
    Backlog: <TbCircleDotted color="grey" />,
    Todo: <FaRegCircle color="grey" />,
    "In progress": <AiFillClockCircle color="grey" />,
    Done: <FaRegCheckCircle color="#5e6ad2" />,
    Canceled: <MdCancel color="grey" />,
  };
  return (
    <>
      {allcolums.map((e) => (
        <div className="percol" key={e}>
          <div className="nameandfunc">
            <div className="statusandnum">
              {filterkey === "status" && (
                <div className="iconandname">
                  {statusicons[e]}
                  <span>{e}</span>
                </div>
              )}

              {filterkey === "priority" && (
                <div className="iconandname">
                  <span className="dot">{prioritymapicons[e]}</span>
                  <span>{prioritymap[e]}</span>
                </div>
              )}

              {filterkey === "userId" && (
                <div className="iconandname">
                  {users
                    .filter((user) => user.id === e)
                    .map((usr) => (
                      <span key={usr.id}>{usr.name}</span>
                    ))}
                </div>
              )}
              <span className="tktid">
                {tickets.filter((tkt) => tkt[filterkey] === e).length}
              </span>
            </div>
            <div className="plusanddots">
              <span>
                <FaPlus color="grey" />
              </span>
              <span>
                <BsThreeDots color="grey" />
              </span>
            </div>
          </div>
          <div className="allcardsdiv">
            {tickets
              .filter((tkt) => tkt[filterkey] === e)
              .map((tkts) => (
                <Card
                  tkts={tkts}
                  btmlefticon={btmlefticon}
                  titleicon={titleicon}
                  prioritymapicons={prioritymapicons}
                  statusicons={statusicons}
                />
              ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default KanbanBoard;
