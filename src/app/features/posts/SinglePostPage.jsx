import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import { useParams } from "react-router-dom";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";

const SinglePostPage = () => {
  const { postId } = useParams();
  console.log("postId from params:", postId);

  const posts = useSelector((state) => state.posts.posts);
  console.log("All posts from state:", posts);

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  console.log("Fetched post:", post);

  if (!post) {
    return (
      <section className="max-w-2xl mx-auto my-8 p-4 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-bold text-gray-800">Post not found</h2>
      </section>
    );
  }

  return (
    <article className="max-w-2xl mx-auto my-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.body}</p>
      <div className="text-gray-600 text-sm mb-4">
        <Link className="text-blue-500 hover:underline mr-2" to={`/post/edit/${post.id}`}>
          Edit Post
        </Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </div>
      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePostPage;
