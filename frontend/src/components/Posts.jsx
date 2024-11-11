import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import Post from './Post';
import '../styles/posts.css';
import Pagination from './Pagination';
const Posts = () => {
  const {
    posts,
    setPosts,
    currentPage,
    setCurrentPage,
    setTotalPages,
    setIsLogged,
  } = useContext(UserContext);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogged(true);
    }

    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5100/api/user/posts/?page=${currentPage}&limit=3`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [setPosts, setTotalPages, currentPage, setCurrentPage, setIsLogged]);
  return (
    <>
      <div className="post-container">
        {posts.length > 0 &&
          posts.map((post) => <Post post={post} key={post._id} />)}
        {posts.length === 0 && <p className="dummy-msg">No Posts added</p>}
        {posts.length > 0 && <Pagination />}
      </div>
    </>
  );
};

export default Posts;
