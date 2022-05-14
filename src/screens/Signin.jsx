import React, { useContext, useState, useRef, useEffect } from 'react';
import { ThemeContext } from 'styled-components/native';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Button, Image, Input, ErrorMessage } from '../components';
import { validateEmail, removeWhitespace } from '../untils';
import { UserContext, ProgressContext } from '../contexts';
import { login } from '../config/AxiosFunctions';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;

const ICON =
  'https://firebasestorage.googleapis.com/v0/b/rn-catch-my-hand.appspot.com/o/icon.png?alt=media';

const Signin = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const theme = useContext(ThemeContext);
  const { setUser } = useContext(UserContext); // setUser 로 사용자정보를 업데이트함
  const { spinner } = useContext(ProgressContext); // spinner 호출

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const refPassword = useRef(null);

  // TButton 의 활성화 여부를 결정하는 disabled 상태변수의 값을 변경
  useEffect(() => {
    setDisabled(!(id && password && !errorMessage));
    //console.log(disabled);
  }, [id, password, errorMessage]);

  // 입력된 이메일주소내 공백제거
  const _handleEmailchange = (id) => {
    const changedId = removeWhitespace(id);
    setId(changedId);
    setErrorMessage(
      validateEmail(changedId) ? '' : '아이디를 알맞게 입력하시오.'
    );
  };

  // 입력된 암호내 공백제거
  const _handlePasswordChange = (password) => {
    setPassword(removeWhitespace(password));
  };

  const doSignIn = () => {
    console.log(id);
    console.log(password);
    if (id == '') {
      //setEmailError('이메일을 입력해주세요');
    } else {
      //setEmailError('');
    }

    if (password == '') {
      //setPasswordError('비밀번호를 입력해주세요');
    } else {
      //setPasswordError('');
    }
    login(id, password, navigation);
  };

  const _handleSigninBtnPress = async () => {
    try {
      spinner.start();
      const { user } = await signInWithEmailAndPassword(auth, id, password);
      //console.log('333333 ', user);
      navigation.navigate('Profile', { user });
      setUser(user); // 로그인성공시 setUser 기능으로 사용자정보를 업데이트함
    } catch (e) {
      Alert.alert('Signin Error', e.message);
    } finally {
      spinner.stop(); // 로그인실패여부와 상관없이  spinner 스톱
    }
    //console.log('로그인');
  };
  /* pass Components의 onSubmitEding과 Signin버튼에서 호출되는 
  imPress가 같은함수를 바라보도록 handleSigninBtnPress라는 함수를 만들어서 적용시킨다. */

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={20}
      contentContainerStyle={{ flex: 1 }}
    >
      <Container insets={insets}>
        <Image url={ICON} />
        <Input
          label="ID"
          placeholder="아이디를 입력하시오."
          returnKeyType="next"
          value={id}
          onChangeText={setId}
          onSubmitEditing={() => refPassword.current.focus()}
        />
        <ErrorMessage message={errorMessage} />
        <Input
          ref={refPassword}
          label="PW"
          placeholder="비밀번호를 입력하시오."
          returnKeyType="done"
          value={password}
          onChangeText={_handlePasswordChange}
          isPassword={true}
          onSubmitEditing={_handleSigninBtnPress}
        />
        <Button title="로그인" onPress={_handleSigninBtnPress} disabled={disabled} />
        <Button
          title="회원가입"
          onPress={() => navigation.navigate('Signup')}
          containerStyle={{ marginTop: 0, backgroundColor: 'transparent' }}
          textStyle={{ color: theme.btnTextLink, fontSize: 18 }}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signin;
