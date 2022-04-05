import './App.css';
import Header from './components/Header';
import { Backdrop, CircularProgress, createTheme, ThemeProvider, makeStyles } from '@material-ui/core';
import Footer from './components/Footer';
import TableView from './components/Table';
import { useEffect, useState } from 'react';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    background: '#283D4A',
  },
}));

function App() {

  const globalTheme = createTheme(() => ({
    typography: {
      button: {
        fontSize: '1rem',
      },
    },
  }))

  const [isBackdropOpen, setIsBackdropOpen] = useState(true);
  const classes = useStyles();
  return (
    <div className="App">
      {/* <ThemeProvider theme={globalTheme}> */}

      {!isBackdropOpen && <Header />}
      <TableView isBackdropOpen={isBackdropOpen} closeBackdrop={() => setIsBackdropOpen(false)} />
      {!isBackdropOpen && <Footer />}
        
        <Backdrop className={classes.backdrop} open={isBackdropOpen}>
          <CircularProgress color="inherit" />
        </Backdrop>
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
