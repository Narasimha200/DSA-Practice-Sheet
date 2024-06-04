import React from "react";
import { Link } from "react-router-dom";
export default function TopicCard({ topic }) {
  const { Name, Url } = topic;
  return (
    <Link to={Name}>
      <div className="topicCard" style={{ borderRadius: "1rem" }}>
        {/* <img src={Url} style={{width:"100%",borderRadius:"1rem"}}/> */}
        <p>{Name}</p>
      </div>
    </Link>
  );
}
