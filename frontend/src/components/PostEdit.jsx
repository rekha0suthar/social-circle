import React, { useContext, useEffect } from 'react';
import '../styles/post-form.css';
import { UserContext } from '../context/UserContext';
import { useParams } from 'react-router-dom';

const PostEdit = () => {
  const { title, setTitle, content, setContent, loading, editPost, fetchPost } =
    useContext(UserContext);

  const { id } = useParams();

  useEffect(() => {
    fetchPost(id);
  }, [id]);
  return (
    <div className="post-form">
      <h2>Edit Post</h2>
      <form onSubmit={(e) => editPost(e, id)}>
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
