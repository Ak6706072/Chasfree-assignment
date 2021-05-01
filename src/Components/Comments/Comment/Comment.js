import React, { useState } from "react";
import Textbox from "../../Textbox/Textbox";
import crypto from "crypto";
import "./style.css";

function dynamicStyle(pad) {
  if (pad === 0) {
    return {
      backgroundColor: "white",
      marginTop: 3,
      marginBottom: 3,
      width: "70%",
    };
  } else {
    return {
      backgroundColor: "white",
      marginTop: 3,
      marginBottom: 3,
      marginLeft: pad * 25,
      width: "70%",
    };
  }
}

function Comment(props) {
  const [msg, setMsg] = useState("");
  const [usr, setUsr] = useState("Anonymous");
  const {
    uniqueId,
    userName,
    date,
    pad,
    time,
    addReply,
    deleteComment,
    isAdding,
    comments,
    commentMsg,
    setAllComments,
  } = props;

  const addNestedComment = (uniqueId) => {
    let commentCopy = [...comments];
    console.log(msg, uniqueId, usr);
    const commObj = {};
    commObj.uniqueId = crypto.randomBytes(8).toString("hex");
    commObj.userName = usr;
    commObj.commentMsg = msg;
    commObj.isAdding = false;
    commObj.comment = undefined;
    commObj.date = new Date().toDateString();
    commObj.time = new Date().toLocaleTimeString();
    console.log(commObj);
    commentCopy = commentCopy.map((commentObj) => {
      if (commentObj.comment !== undefined) {
        let next = commentObj.comment;
        while (next !== undefined) {
          next.isAdding = false;
          if (next.uniqueId === uniqueId) {
            let temp = next.comment;
            next.comment = commObj;
            commObj.comment = temp;
          }
          next = next.comment;
        }
      }
      if (commentObj.uniqueId === uniqueId) {
        let temp = commentObj.comment;
        commentObj.comment = commObj;
        commObj.comment = temp;
      }
      return { ...commentObj, isAdding: false };
    });
    console.log("Comments", commentCopy);
    setAllComments(commentCopy);
  };
  return (
    <div style={dynamicStyle(pad)}>
      {/* header of the comment */}
      <div className="comment_header">
        <span className="comment_username">{userName}</span>
        <small className="comment_generated_time">
          {date} &nbsp;
          {time}
        </small>
      </div>
      {/* body of the comment */}
      <div className="comment_msg_body">{commentMsg}</div>
      {/* footer of the comment */}
      <div className="comment_footer">
        <div>
          {isAdding && (
            <Textbox
              setUserName={setUsr}
              setCommentMsg={setMsg}
              isNestedComment={true}
              addNestedComment={() => addNestedComment(uniqueId)}
              cols={40}
              rows={2}
            />
          )}
        </div>
        {!isAdding && (
          <button className="textbox_btn" onClick={() => addReply(uniqueId)}>
            Add Reply
          </button>
        )}
        <button
          className="textbox_btn"
          onClick={() => {
            deleteComment(uniqueId);
          }}
        >
          Delete Comment
        </button>
      </div>
    </div>
  );
}

export default Comment;
