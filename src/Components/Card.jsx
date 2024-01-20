import React from "react";
import "./KanbanBoard.css";
import { GoDotFill } from "react-icons/go";
import { AiOutlineDash } from "react-icons/ai";

const Card = ({
  tkts,
  btmlefticon,
  titleicon,
  prioritymapicons,
  statusicons,
  imgoncard,
}) => {
  const randomImgLink = "https://picsum.photos/20/20?random=";
  // to get random images for the users
  return (
    <div className="card" key={tkts.id}>
      <div>
        <div className="imgandtktid">
          <span className="tktid">{tkts.id}</span>

          {imgoncard && (
            <span>
              <img
                src={randomImgLink + tkts.userId.split("-")[1]}
                className="imgs"
                alt=""
              />
              {/* GENERATING RANDOM IMAGES */}
            </span>
          )}
        </div>
        <div className="titleandicon">
          {titleicon === "status" && (
            <div className="icon">{statusicons[tkts.status]}</div>
          )}
          <div className="title">{tkts.title}</div>
        </div>
      </div>
      <div className="tags">
        {btmlefticon === "priority" && (
          <div className="dashdashdash">
            <span className="dot">{prioritymapicons[tkts.priority]}</span>
          </div>
        )}
        {tkts.tag.map((t) => (
          <div className="tag" key={t}>
            <div className="dot">
              <GoDotFill />
            </div>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
