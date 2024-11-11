import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import Post from './Post';
import '../styles/posts.css';
const Posts = () => {
  const { posts, setPosts } = useContext(UserContext);
  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5100/api/user/posts/',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [setPosts]);
  return (
    <>
      <div className="post-container">
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </>
  );
};

export default Posts;
