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
          'https://socialify-backend-rekha0suthars-projects.vercel.app/api/user/posts/',
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
        {posts.length > 0 &&
          posts.map((post) => <Post post={post} key={post._id} />)}
        {posts.length === 0 && <p>No Posts added</p>}
      </div>
    </>
  );
};

export default Posts;
