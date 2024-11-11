import React, { useContext } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import '../styles/post.css';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Post = ({ post }) => {
  const { setPosts } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');

    const confirmed = window.confirm(
      'Are you sure you want to delete this delete?'
    );
    if (confirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:5100/api/user/posts/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(response.data.msg);
        setPosts(response.data.posts);
      } catch (err) {
        console.log(err);
        toast.error(err);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/post/${id}`);
  };

  // Format updatedAt
  const formattedDate = new Date(post.createdAt).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return (
    <>
      <div key={post._id} className="post">
        <div className="post-card">
          <h2>{post.title}</h2>
          <div className="btns">
            <button className="edit-btn" onClick={() => handleEdit(post._id)}>
              <MdEdit />
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDelete(post._id)}
            >
              <MdDelete />
            </button>
          </div>
        </div>

        <p>{post.content}</p>
        <p>{formattedDate}</p>
      </div>
    </>
  );
};

export default Post;
