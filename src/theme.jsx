const Colors = {
  white: '#ffffff',
  black: '#111111',
  main: '#F6EBFC',
  grey_0: '#d5d5d5',
  grey_1: '#a6a6a6',
  red: '#e84118',
};

export const theme = {
  background: Colors.main,
  text: Colors.black,
  errorText: Colors.red,

  // Button
  btnBackground: Colors.main,
  btnTitle: Colors.black,
  btnTextLink:
    Colors.black /* 배경색이 없는 버튼을 이용할때 사용할 색을 정의한 코드 */,
  btnSignout: Colors.red,

  // Image
  imgBackground: Colors.grey_0,
  imgBtnBackground: Colors.grey_1,
  imgBtnIcon: Colors.white,

  // Input
  inputBackground: Colors.white,
  inputLabel: Colors.grey_1,
  inputPlaceholder: Colors.grey_1,
  inputBorder: Colors.grey_1,
  inputDisabled: Colors.grey_0,

  // Spinner
  spinnerBackground: Colors.black,
  spinnerIndicator: Colors.white,

  //Tab
  tabBtnActive: Colors.main,
  tabBtnInactive: Colors.grey_1,

  // List - Item
  itemBorder: Colors.grey_0,
  itemTime: Colors.grey_1,
  itemDesc: Colors.grey_1,
  itemIcon: Colors.text,

  // Chat
  sendBtnActive: Colors.main,
  sendBtnInactive: Colors.grey_1,
};
