import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext({});

const BASE_API_URL = 'http://localhost:5100/api';
//'https://socialify-backend-rekha0suthars-projects.vercel.app/api'; // ;

const UserContextProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      setIsLogged(true); // Set `isLogged` based on token presence
    }
  }, [token]);

  // Method for Signup user --- input: name, username, password
  const signup = async (e) => {
    // preventing page from refresh
    e.preventDefault();

    // Signup User object
    const newUser = { name, username, password };

    try {
      // setting loading true until we back response
      setLoading(true);

      // calling api and store response
      const response = await axios.post(
        `${BASE_API_URL}/user/signup`,
        newUser,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success(response.data.msg); // success alert
      navigate('/login'); // redirect to login page
      setLoading(false); //setting loading false
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.msg || 'Signup failed';
      toast.error(errorMsg); // show specific error message if available
    }
  };

  // Method for login --- input: username and password
  const login = async (e) => {
    // preventing page from refresh
    e.preventDefault();

    const newUser = { username, password };

    try {
      // setting loading true until we back response
      setLoading(true);
      const response = await axios.post(`${BASE_API_URL}/user/login`, newUser, {
        headers: { 'Content-Type': 'application/json' },
      });

      toast.success(response.data.msg); // success alert
      localStorage.setItem('token', response.data.token); // storing token in localstorage
      setIsLogged(true); // setting isLogged true
      navigate('/dashboard'); // redirecting to dashboard after successfull login
    } catch (err) {
      console.error(err);
      toast.error('Incorrect username/password'); // error alert
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  // Method for logout
  const logout = () => {
    localStorage.removeItem('token'); // removing token from localstorage
    setIsLogged(false); // setting isLogged to false
    navigate('/login'); // redirecting to login after logout
  };

  // Method to fetch user posts with pagination
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/user/posts/?page=${currentPage}&limit=4`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // header with token
          },
        }
      );
      setPosts(response.data.posts); // storing all posts
      setTotalPages(response.data.totalPages); // updating total pages
      setCurrentPage(response.data.currentPage); // updating current page
    } catch (err) {
      console.log(err);
    }
  };

  const addPost = async (e) => {
    // preventing page from refresh
    e.preventDefault();

    try {
      // Set token in authorization headers for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // setting loading true until we back response
      setLoading(true);
      const response = await axios.post(`${BASE_API_URL}/user/posts/`, {
        title,
        content,
      });
      toast.success(response.data.msg); // success alert
      setPosts([response.data, ...posts]); // storing all posts
      setTitle(''); // clearing title field
      setContent(''); // clearing content field
      navigate('/dashboard'); // redirecting to dashboard after adding post
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err); // error alert
    }
  };

  // Method to update post
  const editPost = async (e, id) => {
    // preventing page from refresh
    e.preventDefault();
    try {
      // setting loading true until we back response

      setLoading(true);
      const response = await axios.put(
        `${BASE_API_URL}/user/posts/${id}`,
        { title, content },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.msg); // success alert
      setPosts([response.data, ...posts]); // storing all posts
      setTitle(''); // clearing title field
      setContent(''); // clearing content field
      navigate('/dashboard'); // redirecting to dashboard after adding post
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };

  // Method to delete post
  const deletePost = async (id) => {
    // alert confirmation before delete
    const confirmed = window.confirm(
      'Are you sure you want to delete this delete?'
    );
    if (confirmed) {
      try {
        const response = await axios.delete(
          `${BASE_API_URL}/user/posts/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(response.data.msg); // success alert
        setPosts(response.data.posts); // storing all posts
      } catch (err) {
        console.log(err);
        toast.error(err);
      }
    }
  };

  // Method to fetch post based on id
  const fetchPost = async (id) => {
    const response = await axios.get(`${BASE_API_URL}/user/posts/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    setTitle(response.data.title);
    setContent(response.data.content);
  };

  return (
    <UserContext.Provider
      value={{
        name,
        setName,
        username,
        setUsername,
        password,
        setPassword,
        users,
        setUsers,
        isLogged,
        setIsLogged,
        title,
        setTitle,
        content,
        setContent,
        posts,
        setPosts,
        loading,
        setLoading,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        login,
        logout,
        signup,
        fetchPosts,
        fetchPost,
        addPost,
        editPost,
        deletePost,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
