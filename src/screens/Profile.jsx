import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import app from '../firebase';
import { Button, Image, Input } from '../components';
import { UserContext } from '../contexts';
import { ProgressContext } from '../contexts';
import { ThemeContext } from 'styled-components/native';

const auth = getAuth(app);

const getCurrentUser = () => {
  const { uid, displayName, email, photoURL } = auth.currentUser;
  return { uid, name: displayName, email, photo: photoURL };
};

const updateUserInfo = async (photo) => {
  const photoURL = await uploadImage(photo);
  await updateProfile(auth.currentUser, { photoURL });
  return photoURL;
};

const signout = async () => {
  await signOut(auth);
  return {};
};

const uploadImage = async (uri) => {
  if (uri.startsWith('https')) {
    return uri;
  }

  const response = await fetch(uri);
  const blob = await response.blob();

  const { uid } = auth.currentUser;
  const storage = getStorage(app);
  const storageRef = ref(storage, `/Profile/${uid}/photo.png`);
  await uploadBytes(storageRef, blob, {
    contentType: 'image/png',
  });

  return await getDownloadURL(storageRef);
};

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const Profile = ({ navigation, route }) => {
  //console.log(route.params);
  const { spinner } = useContext(ProgressContext);
  const { setUser } = useContext(UserContext);
  const user = getCurrentUser();
  const [photo, setPhoto] = useState(user.photo);
  const theme = useContext(ThemeContext);

  const _handlePhotoChange = async (url) => {
    try {
      spinner.start();
      const photoURL = await updateUserInfo(url);
      setPhoto(photoURL);
    } catch (e) {
      Alert.alert('Photo Error', e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <Container>
      <Image showButton url={photo} onChangePhoto={_handlePhotoChange} />
      <Input label="Name" value={user.name} disabled />
      <Input label="Email" value={user.email} disabled />
      <Button
        title="로그아웃"
        onPress={async () => {
          try {
            spinner.start();
            await signout();
          } catch (e) {
          } finally {
            setUser({});
            spinner.stop();
          }
        }}
        containerStyle={{
          backgroundColor: theme.btnSignout,
        }}
      />
    </Container>
  );
};

export default Profile;

/*

const Profile = () => {
  const { spinner } = useContext(ProgressContext);
  const { setUser } = useContext(UserContext);
  const theme = useContext(ThemeContext);
  const user = getCurrentUser();

  const [photo, setPhoto] = useState(user.photo);

  const _handlePhotoChange = async url => {
    try {
      spinner.start();
      const photoURL = await updateUserInfo(url);
      setPhoto(photoURL);
    } catch (e) {
      Alert.alert('Photo Error', e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <Container>
      <Image showButton url={photo} onChangePhoto={_handlePhotoChange} />
      <Input label="Name" value={user.name} disabled />
      <Input label="Email" value={user.email} disabled />
      <Button
        title="Sign out"
        onPress={async () => {
          try {
            spinner.start();
            await signout();
          } catch (e) {
          } finally {
            setUser({});
            spinner.stop();
          }
        }}
        containerStyle={{
          backgroundColor: theme.btnSignout,
        }}
      />
    </Container>
  );
};

*/
