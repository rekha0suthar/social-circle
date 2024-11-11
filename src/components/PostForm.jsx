import React, { useContext, useEffect } from 'react';
import '../styles/post-form.css';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostForm = () => {
  const { title, setTitle, content, setContent, posts, setPosts } =
    useContext(UserContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'http://localhost:5100/api/user/posts/',
        { title, content },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await toast.success(response.data.msg);
      setPosts([response.data, ...posts]);
      setTitle('');
      setContent('');
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };
  useEffect(() => {
    setTitle('');
    setContent('');
  }, [setTitle, setContent]);
  return (
    <div className="post-form">
      <h2>Add Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter post title ...."
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label> Content</label>
        <textarea
          placeholder="Enter post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default PostForm;
