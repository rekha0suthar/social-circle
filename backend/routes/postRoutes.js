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

router.post('/', auth, addPost);

router.get('/', auth, getPosts);

router.get('/:id', auth, getPost);

router.put('/:id', auth, editPost);

router.delete('/:id', auth, deletePost);

export default router;
