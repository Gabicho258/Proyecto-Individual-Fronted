import React from "react";

import { RatingComponent } from "../Rating/RatingComponent";
import "./_Comment.scss";

export const Comment = ({ author, rate, comment }) => {
  return (
    <div className="comment-container">
      <h3>{author}</h3>
      <RatingComponent readOnly={true} rate={rate} />
      <p>{comment}</p>
    </div>
  );
};
