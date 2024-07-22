  import React, { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { addNewPost } from "./postsSlice";
  import { selectAllUsers } from "../users/usersSlice";
  import { useNavigate } from "react-router-dom";

  const AddPostForm = () => {
    const dispatch = useDispatch();
    const navigate  = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");
    const [addRequestStatus, setAddRequestStatus] = useState("idle");

    const users = useSelector(selectAllUsers);

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleContentChange = (e) => setContent(e.target.value);
    const handleUserIdChange = (e) => setUserId(e.target.value);

    const canSave =
      [title, content, userId].every(Boolean) && addRequestStatus === "idle";

    const handleSavePost = () => {
      if (canSave) {
        try {
          setAddRequestStatus("pending");
          dispatch(addNewPost({ title, body: content, userId })).unwrap();
          setTitle("");
          setContent("");
          setUserId("");
          navigate('/')
        } catch (err) {
          console.error("Failed to save the post", err);
        } finally {
          setAddRequestStatus("idle");
        }
      }
    };

    const userOptions = users.map((user) => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ));

    return (
      <section className="p-4 bg-white border rounded-lg shadow-sm mb-4">
        <h2 className="text-2xl font-semibold mb-4">Add a New Post</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="postTitle" className="block text-sm font-medium mb-1">
              Post Title
            </label>
            <input
              type="text"
              id="postTitle"
              name="postTitle"
              value={title}
              onChange={handleTitleChange}
              className="w-80 border rounded-lg px-3 py-2 text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="postAuthor" className="block text-sm font-medium mb-1">
              Author
            </label>
            <select
              id="postAuthor"
              value={userId}
              onChange={handleUserIdChange}
              className="w-80 border rounded-lg px-3 py-2 text-gray-900"
            >
              <option value="">Select an author</option>
              {userOptions}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="postContent" className="block text-sm font-medium mb-1">
              Content
            </label>
            <textarea
              id="postContent"
              name="postContent"
              value={content}
              onChange={handleContentChange}
              className="w-full border rounded-lg px-3 py-2 text-gray-900"
              rows="4"
            />
          </div>
          <button
            type="button"
            onClick={handleSavePost}
            disabled={!canSave}
            className={`px-4 py-2 text-white font-semibold rounded-lg ${
              canSave ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400"
            }`}
          >
            Save Post
          </button>
        </form>
      </section>
    );
  };

  export default AddPostForm;
