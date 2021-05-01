import React, { useState } from "react";
import Dropdown from "./Components/Dorpdown/Dropdown";
import Textbox from "./Components/Textbox/Textbox";
import Comments from "./Components/Comments/Comments";
import crypto from "crypto";
import "./App.css";

const allComment = [
  {
    userName: "ashish",
    commentMsg: "sothing happend",
    isAdding: false,
    comment: undefined,
    date: new Date().toDateString(),
    time: new Date().toLocaleTimeString(),
    uniqueId: crypto.randomBytes(6).toString("hex"),
  },
  {
    uniqueId: crypto.randomBytes(6).toString("hex"),
    userName: "ashish kumar",
    commentMsg: "nothing happend",
    isAdding: false,
    comment: {
      uniqueId: crypto.randomBytes(6).toString("hex"),
      userName: "ashish 1",
      commentMsg: "sothing happend",
      isAdding: false,
      comment: {
        uniqueId: crypto.randomBytes(6).toString("hex"),
        userName: "ashish 2",
        commentMsg: "sothing happend",
        isAdding: false,
        comment: {
          uniqueId: crypto.randomBytes(6).toString("hex"),
          userName: "ashish 3",
          commentMsg: "sothing happend",
          isAdding: false,
          comment: undefined,
          date: new Date().toDateString(),
          time: new Date().toLocaleTimeString(),
        },
        date: new Date().toDateString(),
        time: new Date().toLocaleTimeString(),
      },
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString(),
    },
    date: new Date().toDateString(),
    time: new Date().toLocaleTimeString(),
  },
  {
    uniqueId: crypto.randomBytes(6).toString("hex"),
    userName: "ashish",
    commentMsg: "sothing happend",
    isAdding: false,
    comment: undefined,
    date: new Date().toDateString(),
    time: new Date().toLocaleTimeString(),
  },
  {
    uniqueId: crypto.randomBytes(6).toString("hex"),
    userName: "ashish",
    commentMsg: "sothing happend",
    isAdding: false,
    comment: undefined,
    date: new Date().toDateString(),
    time: new Date().toLocaleTimeString(),
  },
  {
    uniqueId: crypto.randomBytes(6).toString("hex"),
    userName: "ashish kumar",
    commentMsg: "nothing happend",
    isAdding: false,
    comment: {
      uniqueId: crypto.randomBytes(6).toString("hex"),
      userName: "ashish 1",
      commentMsg: "sothing happend",
      isAdding: false,
      comment: {
        uniqueId: crypto.randomBytes(6).toString("hex"),
        userName: "ashish 2",
        commentMsg: "sothing happend",
        isAdding: false,
        comment: {
          uniqueId: crypto.randomBytes(6).toString("hex"),
          userName: "ashish 3",
          commentMsg: "sothing happend",
          isAdding: false,
          comment: {
            uniqueId: crypto.randomBytes(6).toString("hex"),
            userName: "ashish 3",
            commentMsg: "sothing happend",
            isAdding: false,
            comment: {
              uniqueId: crypto.randomBytes(6).toString("hex"),
              userName: "ashish 3",
              commentMsg: "sothing happend",
              isAdding: false,
              comment: {
                uniqueId: crypto.randomBytes(6).toString("hex"),
                userName: "ashish 3",
                commentMsg: "sothing happend",
                isAdding: false,
                comment: undefined,
                date: new Date().toDateString(),
                time: new Date().toLocaleTimeString(),
              },
              date: new Date().toDateString(),
              time: new Date().toLocaleTimeString(),
            },
            date: new Date().toDateString(),
            time: new Date().toLocaleTimeString(),
          },
          date: new Date().toDateString(),
          time: new Date().toLocaleTimeString(),
        },
        date: new Date().toDateString(),
        time: new Date().toLocaleTimeString(),
      },
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString(),
    },
    date: new Date().toDateString(),
    time: new Date().toLocaleTimeString(),
  },
];

function App() {
  const [userName, setUserName] = useState("shohan012");
  const [commentMsg, setCommentMsg] = useState("");
  const [allComments, setAllComments] = useState(allComment);

  const addComment = () => {
    if (commentMsg === "") {
      return;
    }
    const commentObj = {};
    commentObj.uniqueId = crypto.randomBytes(15).toString("hex");
    commentObj.userName = userName;
    commentObj.commentMsg = commentMsg;
    commentObj.isAdding = false;
    commentObj.comment = undefined;
    commentObj.date = new Date().toDateString();
    commentObj.time = new Date().toLocaleTimeString();

    setCommentMsg("");
    setAllComments([commentObj, ...allComments]);
  };

  const addReply = (uniqueId) => {
    let commentCopy = [...allComments];
    commentCopy = commentCopy.map((commentObj) => {
      if (commentObj.comment !== undefined) {
        let next = commentObj.comment;
        while (next !== undefined) {
          next.isAdding = false;
          if (next.uniqueId === uniqueId) {
            next.isAdding = true;
          }
          next = next.comment;
        }
      }
      if (commentObj.uniqueId === uniqueId) {
        return { ...commentObj, isAdding: true };
      } else {
        return { ...commentObj, isAdding: false };
      }
    });
    console.log("Comments", commentCopy);
    setAllComments(commentCopy);
  };

  const deleteComment = (uniqueId) => {
    const commentsCopy = [...allComments];

    const filteredComments = commentsCopy.filter((commentObj) => {
      if (
        commentObj.uniqueId !== uniqueId &&
        commentObj.comment !== undefined
      ) {
        let prev = commentObj;
        let next = commentObj.comment;
        while (next !== undefined) {
          if (next.uniqueId === uniqueId) {
            prev.comment = undefined;
            break;
          }
          prev = prev.comment;
          next = next.comment;
        }
      }
      if (commentObj.uniqueId === uniqueId) {
        return false;
      } else {
        return true;
      }
    });
    setAllComments(filteredComments);
  };

  return (
    <div className="app">
      <Dropdown userName={userName} setUserName={setUserName} />
      <Textbox
        commentMsg={commentMsg}
        setCommentMsg={setCommentMsg}
        addComment={addComment}
        adding={false}
        cols={80}
        rows={5}
      />
      <Comments
        deleteComment={deleteComment}
        addReply={addReply}
        comments={allComments}
        setAllComments={setAllComments}
        setCommentMsg={setCommentMsg}
      />
    </div>
  );
}

export default App;
