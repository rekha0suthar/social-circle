import React, { useContext } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import '../styles/post.css';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Post = ({ post }) => {
  const { deletePost } = useContext(UserContext);
  const navigate = useNavigate();

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
    <div key={post._id} className="post">
      <div className="post-card">
        <h2>{post.title}</h2>
        <div className="btns">
          <button className="edit-btn" onClick={() => handleEdit(post._id)}>
            <MdEdit />
          </button>
          <button className="delete-btn" onClick={() => deletePost(post._id)}>
            <MdDelete />
          </button>
        </div>
      </div>

      <p>{post.content}</p>
      <p>{formattedDate}</p>
    </div>
  );
};

export default Post;
