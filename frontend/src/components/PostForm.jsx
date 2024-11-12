import React, { useContext, useEffect } from 'react';
import '../styles/post-form.css';
import { UserContext } from '../context/UserContext';

const PostForm = () => {
  const { title, setTitle, content, setContent, loading, addPost } =
    useContext(UserContext);

  useEffect(() => {
    setTitle('');
    setContent('');
  }, [setTitle, setContent]);
  return (
    <div className="post-form">
      <h2>Add Post</h2>
      <form onSubmit={addPost}>
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
        <button type="submit">{loading ? 'Saving ...' : 'Save'}</button>
      </form>
    </div>
  );
};

export default PostForm;
