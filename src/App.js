// Css file

import './App.css';

// Mui components

import Header from './components/Header';
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import Footer from './components/Footer';
import TableView from './components/Table';
import { useState } from 'react';

// theming

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    background: '#283D4A',
  },
}));

// App

function App() {

  const classes = useStyles();
  const [isBackdropOpen, setIsBackdropOpen] = useState(true);

  return (
    <div className="App">

      {!isBackdropOpen && <Header />}
      <TableView isBackdropOpen={isBackdropOpen}
        closeBackdrop={() => setIsBackdropOpen(false)}
      />
      {!isBackdropOpen && <Footer />}

      <Backdrop className={classes.backdrop} open={isBackdropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>

    </div>
  );
}

export default App;
