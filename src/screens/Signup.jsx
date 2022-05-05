import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { Button, Input, ErrorMessage } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../untils';
import { register } from '../config/AxiosFunctions';

export default function SignUp({ navigation }) {
  const [id, setid] = useState('');
  const [idError, setidError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [confirmPassword, setconfirmPassword] = useState('');
  const [confirmPasswordError, setconfirmPasswordError] = useState('');

  const [phonenum, setPhonenum] = useState('');
  const [phonenumError, setPhonenumError] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [disabled, setDisabled] = useState('');

  const refPhonenum = useRef(null);
  const refPassword = useRef(null);
  const refconfirmPassword = useRef(null);
  const refDidMount = useRef(null); // 초기실행시 error 변수가 화면에 바로  출력되는 것을 방지함

  const doSignUp = async () => {
    console.log(id);
    console.log(password);
    console.log(confirmPassword);
    console.log(phonenum);

    try{
    if (id == '') {
      setidError('이메일을 입력해주세요');
      return false;
    } else {
      setidError('');
    }

    if (password == '') {
      setPasswordError('비밀번호를 입력해주세요');
      return false;
    } else {
      setPasswordError('');
    }

    if (phonenum == '') {
      setPhonenumError('지역을 입력해주세요');
      return false;
    } else {
      setPhonenumError('');
    }

    if (confirmPassword == '') {
      setconfirmPasswordError('비밀번호 확인을 입력해주세요');
      return false;
    } else {
      setconfirmPasswordError('');
    }

    if (password !== confirmPassword) {
      setconfirmPasswordError('비밀번호가 서로 일치 하지 않습니다.');
      return false;
    } else {
      setconfirmPasswordError('');
    }
    await register(id, password, confirmPassword, phonenum, navigation);
  }catch (e){
    console.error(e);
  };
}

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <Input
          label="ID"
          placeholder="아이디를 입력하시오."
          returnKeyType="next"
          value={id}
          onChangeText={setid}
          onSubmitEditing={() => refPassword.current.focus()}
          maxLength={12}
        />
        <Input
          ref={refPassword}
          label="Password"
          placeholder="비밀번호를 입력하시오."
          returnKeyType="next"
          value={password}
          onChangeText={setPassword}
          isPassword={true}
          onSubmitEditing={() => refconfirmPassword.current.focus()}
          onBlur={() => setPassword(removeWhitespace(password))}
        />
        <Input
          ref={refconfirmPassword}
          label="Password Confirm"
          placeholder="비밀번호를 확인합니다."
          returnKeyType="next"
          value={confirmPassword}
          onChangeText={setconfirmPassword}
          isPassword={true}
          onSubmitEditing={() => refPhonenum.current.focus()}
          onBlur={() => setconfirmPassword(removeWhitespace(confirmPassword))}
        />
        <Input
          ref={refPhonenum}
          label="Phone number"
          placeholder="전화번호를 입력하시오."
          returnKeyType="done"
          value={phonenum}
          onChangeText={setPhonenum}
          //onBlur={() => set(removeWhitespace(phonenum))}
        />
        <ErrorMessage message={errorMessage} />
        <Button title="가입하기" onPress={doSignUp} disabled={disabled} />
      </Container>
    </KeyboardAwareScrollView>
  );
}

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding: 50px 20px;
  `;