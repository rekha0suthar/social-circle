import React, { createContext, useState } from 'react';

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
