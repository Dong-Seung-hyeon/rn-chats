import React, { useState, useEffect } from 'react';
import { FlatList, Button } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import moment from 'moment'; // 시간관련 라이브러리
import { app } from '../firebase';
const db = getFirestore(app);

const getDateOrTime = (ts) => {
  const now = moment().startOf('day'); // 현재시간
  const target = moment(ts).startOf('day'); // 전달된시간
  return moment(ts).format(now.diff(target, 'day') > 0 ? 'MM/DD' : 'HH:mm');
  // 날자가 서로다르면 월일이 표시되고, 날자가 같으면 시분이 표시되게 함
};

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const StyledText = styled.Text`
  font-size: 30px;
`;

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.itemBorder};
  padding: 15px 20px;
`;

const ItemTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

const ItemTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const ItemDesc = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.itemDesc};
`;

const ItemTime = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.itemTime};
`;

const ItemIcon = styled(MaterialIcons).attrs(({ theme }) => ({
  name: 'keyboard-arrow-right',
  size: 24,
  color: theme.itemIcon,
}))``;

const Item = React.memo(
  ({ item: { id, title, description, createdAt }, onPress }) => {
    console.log(id);
    return (
      <ItemContainer onPress={() => onPress({ id, title })}>
        <ItemTextContainer>
          <ItemTitle>{title}</ItemTitle>
          <ItemDesc>{description}</ItemDesc>
        </ItemTextContainer>
        <ItemTime>{getDateOrTime(createdAt)}</ItemTime>
        <ItemIcon />
      </ItemContainer>
    );
  }
);

const ChannelList = ({ navigation }) => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const collectionQuery = query(
      collection(db, 'channels'),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(collectionQuery, (snapshot) => {
      const list = [];
      snapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setChannels(list);
    });
    return () => unsubscribe(); // 디비중복호출방지
  }, []);

  return (
    <Container>
      <FlatList
        data={channels}
        renderItem={({ item }) => (
          <Item
            item={item}
            onPress={(params) => navigation.navigate('Channel', params)}
          />
        )}
        // 키값을 설정
        keyExtractor={(item) => item['id'].toString()}
        windowSize={5}
      />
    </Container>
  );
};

export default ChannelList;

/*
const getDateOrTime = ts => {
  const now = moment().startOf('day');
  const target = moment(ts).startOf('day');
  return moment(ts).format(now.diff(target, 'day') > 0 ? 'MM/DD' : 'HH:mm');
};

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.itemBorder};
  padding: 15px 20px;
`;
const ItemTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;
const ItemTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;
const ItemDesc = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.itemDesc};
`;
const ItemTime = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.itemTime};
`;
const ItemIcon = styled(MaterialIcons).attrs(({ theme }) => ({
  name: 'keyboard-arrow-right',
  size: 24,
  color: theme.itemIcon,
}))``;
const Item = React.memo(
  ({ item: { id, title, description, createdAt }, onPress }) => {
    return (
      <ItemContainer onPress={() => onPress({ id, title })}>
        <ItemTextContainer>
          <ItemTitle>{title}</ItemTitle>
          <ItemDesc>{description}</ItemDesc>
        </ItemTextContainer>
        <ItemTime>{getDateOrTime(createdAt)}</ItemTime>
        <ItemIcon />
      </ItemContainer>
    );
  }
);

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const ChannelList = ({ navigation }) => {
  const [channels, setChannels] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    const collectionQuery = query(
      collection(db, 'channels'),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(collectionQuery, snapshot => {
      const list = [];
      snapshot.forEach(doc => {
        list.push(doc.data());
      });
      setChannels(list);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Container>
      <FlatList
        data={channels}
        renderItem={({ item }) => (
          <Item
            item={item}
            onPress={params => navigation.navigate('Channel', params)}
          />
        )}
        keyExtractor={item => item['id'].toString()}
        windowSize={5}
      />
    </Container>
  );
};

*/
