import React, { useState, createContext } from 'react';

const UserContext = createContext({
  user: { uid: null },
  setUser: () => {},
});

const UserProvider = ({ children }) => {
  //  UserContext 에 선언된 user, setUser 와 같은 이름의 변수와 함수로 작성
  const [user, setUserInfo] = useState({});
  const setUser = ({ uid }) => {
    setUserInfo({ uid });
  };
  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
