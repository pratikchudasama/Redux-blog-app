import PostList from "./app/features/posts/PostsList";
import AddPostForm from "./app/features/posts/AddPostForm";
import EditPostForm from "./app/features/posts/EditPostForm";
import SinglePostPage from "./app/features/posts/SinglePostPage";
import Layout from "./app/components/Layout";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchPosts } from "./app/features/posts/postsSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />}/>
        </Route>
      </Route>
    </Routes> 
  );
}

export default App;
