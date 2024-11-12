import Post from '../model/Post.js';

// @desc    Add Post
// @route   POST /api/user/posts/
// @access  Private
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

// @desc    Fetch Posts
// @route   GET /api/user/posts/
// @access  Private
const getPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    //Parse page and limit as Integers
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);

    // Calculate total posts and pages
    const totalPosts = await Post.find({ user: req.user.id }).countDocuments();
    const totalPages = Math.ceil(totalPosts / limitInt);

    // Fetch posts with pagination
    const posts = await Post.find({ user: req.user.id })
      .sort({
        createdAt: -1,
      })
      .skip((pageInt - 1) * limitInt) /// Skip posts for previous pages
      .limit(limitInt); /// Limit the number of posts per page
    res.status(200).json({ posts, totalPages, currentPage: pageInt });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// @desc    Fetch Post
// @route   GET /api/user/posts/
// @access  Private
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

// @desc    Edit Post
// @route   PUT /api/user/posts/:id
// @access  Private
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

// @desc    Delete Post
// @route   DELETE /api/user/posts/:id
// @access  Private
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
