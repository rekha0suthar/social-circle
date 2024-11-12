import { Router } from 'express';
import auth from '../middleware/auth.js';
import Post from '../model/Post.js';
import {
  addPost,
  deletePost,
  editPost,
  getPost,
  getPosts,
} from '../controllers/postController.js';

const router = Router();

router.route('/').get(auth, getPosts).post(auth, addPost);

router
  .route('/:id')
  .get(auth, getPost)
  .put(auth, editPost)
  .delete(auth, deletePost);

export default router;
