import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const StyledText = styled.Text`
   align-items: flex-start;
   width: 100%;
   height: {h_val}px;
   margin-bottom: 10px;
   line-height: {h_val}px;
   color: ${({ theme }) => theme.errorText};
`;

const ErrorMessage = ({ message }) => {
  if (message.length > 1) {
    const h_val = 20;
    return <StyledText>{message}</StyledText>;
  }
  if (message.length <= 1) {
    return null;
  }
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;

/*
const StyledText = styled.Text`
   align-items: flex-start;
   width: 100%;
   height: 20px;
   margin-bottom: 10px;
   line-height: 20px;
   color: ${({theme}) => theme.errorText};
`;

const ErrorMsg = ({message}) => {
   return <StyledText>{message}</StyledText>;
};

ErrorMsg.propTypes = {
   message: PropTypes.string.isRequired,
};

*/
