import {alpha, Box} from '@mui/material';
import { Logo } from './logo';
import { keyframes } from '@emotion/react';

const bounce1 = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 1px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`;

const bounce3 = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 3px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`;

export const SplashScreen = () => (
  <Box
    sx={{
      alignItems: 'center',
      backgroundColor: theme => alpha(theme.palette.primary.main, 0.6),
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      justifyContent: 'center',
      left: 0,
      p: 3,
      position: 'fixed',
      top: 0,
      width: '100vw',
      zIndex: 2000
    }}
  >
    <Logo
      //variant={'light'}
      sx={{
        height: 80,
        width: 80,
      }}
    />
  </Box>
);
