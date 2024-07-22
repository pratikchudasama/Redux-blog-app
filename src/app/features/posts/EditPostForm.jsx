import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost, deletePost } from "./postsSlice";
import { useParams, useNavigate } from "react-router-dom";
import { selectAllUsers } from "../users/usersSlice";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.body || "");
  const [userId, setUserId] = useState(post?.userId || "");
  const [requestStatus, setRequestStatus] = useState("idle");

  const dispatch = useDispatch();

  if (!post) {
    return (
      <section className="max-w-2xl mx-auto my-8 p-4 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-bold text-gray-800">Post not found</h2>
      </section>
    );
  }

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleUserIdChange = (e) => setUserId(e.target.value);

  const canSave = [title, content, userId].every(Boolean) && requestStatus === "idle";

  const handleSavePost = async () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        await dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const userOptions = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ));

  const handleDeletePost = async () => {
    try {
      setRequestStatus("pending");
      await dispatch(deletePost({ id: post.id })).unwrap();
      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <section className="max-w-2xl mx-auto my-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Post</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="postTitle" className="block text-sm font-medium text-gray-700">
            Post Title:
          </label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={handleTitleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="postAuthor" className="block text-sm font-medium text-gray-700">
            Author:
          </label>
          <select
            id="postAuthor"
            value={userId}
            onChange={handleUserIdChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select an author</option>
            {userOptions}
          </select>
        </div>
        <div>
          <label htmlFor="postContent" className="block text-sm font-medium text-gray-700">
            Content:
          </label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={handleContentChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows="5"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleSavePost}
            disabled={!canSave}
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${canSave ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' : 'bg-blue-300 cursor-not-allowed'}`}
          >
            Save Post
          </button>
          <button
            type="button"
            onClick={handleDeletePost}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:ring-red-500"
          >
            Delete Post
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditPostForm;
