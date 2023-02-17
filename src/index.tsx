import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { AppBar, Box, Button, createTheme, Icon, ThemeProvider, Toolbar, Typography } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import './index.scss';
import { Container } from '@mui/system';
import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded';
import Grid from '@mui/material/Grid';
import {Pages, pageState} from './state';
import { RecoilRoot, useRecoilState } from 'recoil';
import { Configure } from './configure';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [page, setPage] = useRecoilState(pageState);
  let sample = "The quick brown fox jumps over the lazy dog.";
  let txt = [sample];
  for (let i = 0; i < 100; i++) {
    txt.push(sample);
  }

  const maxWidth = 'md';
  return <ThemeProvider theme={darkTheme}>
    <div className='app'>
      <div className='top'>
        <AppBar position='static'>
          <Toolbar variant='dense'>
            <Typography variant='h6'>Daily Q</Typography>
          </Toolbar>
        </AppBar>
      </div>
      <div className='content'>
        <Container maxWidth={maxWidth}>
          {page == Pages.Configure && <Configure/>} 
        </Container>
      </div>
      <BottomNavigation showLabels className='bottom'>
        <BottomNavigationAction label="Questions" onClick={()=>setPage(Pages.Questions)} />
        <BottomNavigationAction label="Analytics" onClick={()=>setPage(Pages.Analytics)} />
        <BottomNavigationAction label="Configure" onClick={()=>setPage(Pages.Configure)} />
      </BottomNavigation>
    </div>
  </ThemeProvider>;
}

const root = createRoot(document.getElementById('root') as any);
root.render(<RecoilRoot><App /></RecoilRoot>);
