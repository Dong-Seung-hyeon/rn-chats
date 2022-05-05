import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './Auth';
import { UserContext, ProgressContext } from '../contexts'; //
import Main from './Main';
import { Spinner } from '../components';

const Navigation = () => {
  const { user } = useContext(UserContext);
  const { inProgress } = useContext(ProgressContext);
  return (
    <NavigationContainer>
      {/* 로그인상태에 따라 Main 또는 Auth 화면으로 변경하기 */}
      {user.uid ? <Main /> : <Auth />}
      {inProgress && <Spinner />}
    </NavigationContainer>
  );
};

export default Navigation;

/* 
const Navigation = () => {
  const { user } = useContext(UserContext);
  const { inProgress } = useContext(ProgressContext);

  return (
    <NavigationContainer>
      {user.uid ? <Main /> : <Auth />}
      {inProgress && <Spinner />}
    </NavigationContainer>
  );
};

*/
