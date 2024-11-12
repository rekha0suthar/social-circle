import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import Post from './Post';
import '../styles/posts.css';
import Pagination from './Pagination';

const Posts = () => {
  const {
    posts,
    fetchPosts,
    setPosts,
    setTotalPages,
    currentPage,
    setCurrentPage,
  } = useContext(UserContext);
  useEffect(() => {
    fetchPosts();
  }, [setPosts, setTotalPages, currentPage, setCurrentPage]);
  return (
    <div className="post-container">
      {posts.length > 0 &&
        posts.map((post) => <Post post={post} key={post._id} />)}
      {posts.length === 0 && <p className="dummy-msg">No Posts added</p>}
      {posts.length > 0 && <Pagination />}
    </div>
  );
};

export default Posts;
