import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";

const reactions = {
  like: "👍",
  dislike: "👎",
  heart: "❤️",
  rocket: "🚀",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactions).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <>{reactionButtons}</>;
};

export default ReactionButtons;
