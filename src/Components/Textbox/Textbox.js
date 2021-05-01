import Dropdown from "../Dorpdown/Dropdown";
import React from "react";
import "./style.css";
function Textbox(props) {
  const {
    cols,
    rows,
    commentMsg,
    setCommentMsg,
    addComment,
    addNestedComment,
    isNestedComment,
    setUserName,
  } = props;

  return (
    <>
      {isNestedComment && <Dropdown setUserName={setUserName} />}
      <div className="textbox">
        <textarea
          cols={cols}
          rows={rows}
          placeholder="type Comment..."
          value={commentMsg}
          onChange={(e) => setCommentMsg(e.target.value)}
        ></textarea>

        <button
          onClick={isNestedComment === true ? addNestedComment : addComment}
          className="textbox_btn"
        >
          Add Comment
        </button>
      </div>
    </>
  );
}

export default React.memo(Textbox);
