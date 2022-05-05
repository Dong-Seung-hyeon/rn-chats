import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import Navigation from './navigations';
import { theme } from './theme';
import { UserProvider, ProgressProvider } from './contexts'; //

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <StatusBar backgroundColor={theme.background} barStyle="dark-content" />
        <Navigation />
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;

/*

   return (
      <ThemeProvider theme={theme}>
         <ProgressProvider>
            <UserProvider>
               <StatusBar
                  backgroundColor={theme.background}
                  barStyle="dark-content"
               />
               <Navigation />
            </UserProvider>
         </ProgressProvider>
      </ThemeProvider>
   );
};
*/
