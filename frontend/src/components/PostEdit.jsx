import React, { useContext, useEffect } from 'react';
import '../styles/post-form.css';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostEdit = () => {
  const {
    title,
    setTitle,
    content,
    setContent,
    posts,
    setPosts,
    loading,
    setLoading,
  } = useContext(UserContext);

  const { id } = useParams();
  const token = localStorage.getItem('token');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      setLoading(true);
      const response = await axios.put(
        `https://socialify-backend-rekha0suthars-projects.vercel.app/api/user/posts/${id}`,
        { title, content },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.msg);
      setPosts([response.data, ...posts]);
      setTitle('');
      setContent('');
      navigate('/dashboard');
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };
  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(
        `https://socialify-backend-rekha0suthars-projects.vercel.app/api/user/posts/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle(response.data.title);
      setContent(response.data.content);
    };
    fetchPost();
  }, [id, setTitle, setContent, token]);
  return (
    <div className="post-form">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <br />
        <input
          type="text"
          placeholder="Enter post title ...."
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>Description</label>
        <br />
        <textarea
          placeholder="Enter post content"
          value={content}
          rows={5}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <button type="submit">{loading ? 'Saving ...' : 'Save'}</button>
      </form>
    </div>
  );
};

export default PostEdit;
