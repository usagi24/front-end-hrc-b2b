// React components

import React from "react";

// Mui Components 

import { Grid, makeStyles } from '@material-ui/core';

// Assests

import abclogo from '../assets/ABCLogoFull.svg';
import logo from '../assets/hrcLogo.svg';

// theming

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: '#2D4250',
        padding: '15px 10px 40px',
    },
}))

export default function Header() {

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid
                    container item xs justifyContent="flex-start" alignItems="flex-start">
                    <img src={abclogo} alt={"ABC Products"} style={{ width: '250px' }} />
                </Grid>
                <Grid item xs > 
                    <img src={logo} alt={"highradius"} style={{ width: '190px' }} />
                </Grid>
                <Grid item xs />
            </Grid>
        </div>

    );
}