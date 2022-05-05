// spinner 의 작용여부를 결정하는 함수

import React, { useState, createContext } from 'react';

const ProgressContext = createContext({
  inProgress: false,
  spinner: { start: () => {}, stop: () => {} },
});

const ProgressProvider = ({ children }) => {
  const [inProgress, setInProgress] = useState(false);
  const spinner = {
    // spinner 의 start  stop 함수를 정의
    start: () => setInProgress(true),
    stop: () => setInProgress(false),
  };
  const value = { inProgress, spinner };
  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export { ProgressContext, ProgressProvider };
