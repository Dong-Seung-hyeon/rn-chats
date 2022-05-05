export const validateEmail = (email) => {
  const regex =
    /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]{0,3}$/;
  //console.log(regex.test(email));
  return regex.test(email);
};

export const removeWhitespace = (text) => {
  const t1 = text.replace(/\n/g, ''); // 줄바꿈 제거
  const t2 = t1.replace(/\r/g, ''); // 엔터 제거
  const t3 = t2.replace(/\s*/g, ''); // 공백 제거
  return t3;
};
