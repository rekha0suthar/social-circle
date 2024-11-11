import Post from '../model/Post.js';

const addPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = await new Post({
      title,
      content,
      user: req.user.id,
    }).save();

    res.status(201).json({ mag: 'Post created successfully', post: newPost });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ msg: `Post ${id} not found` });
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const editPost = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ msg: `Post ${id} not found` });
    }
    const posts = await Post.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res
      .status(200)
      .json({ msg: `Post ${id} updated successfully`, posts: posts });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ msg: `Post ${id} not found` });
    }

    const posts = await Post.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res
      .status(200)
      .json({ msg: `Post ${id} deleted successfully`, posts: posts });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export { addPost, getPosts, getPost, editPost, deletePost };
