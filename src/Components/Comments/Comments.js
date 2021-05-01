import React, { memo } from "react";
import Comment from "./Comment/Comment";
import crypto from "crypto";
import "./style.css";
function Comments(props) {
  const {
    comments,
    deleteComment,
    addReply,
    setAllComments,
    commentMsg,
    setCommentMsg,
  } = props;

  const parseNestedComponents = (comment, arrayofNestedComponents) => {
    if (comment === undefined) {
      return;
    }
    console.log("hello", arrayofNestedComponents);
    arrayofNestedComponents.push({ ...comment });
    parseNestedComponents(comment.comment, arrayofNestedComponents);
  };
  return (
    <div className="comments">
      {comments.map((comment, index) => {
        if (comment.comment !== undefined) {
          const arrayofNestedComponents = [];
          parseNestedComponents(comment, arrayofNestedComponents);
          return arrayofNestedComponents.map((nestedComment, index) => {
            return (
              <Comment
                key={crypto.randomBytes(8).toString("hex")}
                {...nestedComment}
                pad={index}
                deleteComment={deleteComment}
                addReply={addReply}
                comments={comments}
                setAllComments={setAllComments}
                setCommentMsg={setCommentMsg}
              />
            );
          });
        }
        return (
          <Comment
            key={crypto.randomBytes(8).toString("hex")}
            {...comment}
            pad={0}
            deleteComment={deleteComment}
            addReply={addReply}
            comments={comments}
            setAllComments={setAllComments}
            setCommentMsg={setCommentMsg}
          />
        );
      })}
    </div>
  );
}

export default memo(Comments);
