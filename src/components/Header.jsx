import React from "react";
import { Grid, makeStyles } from '@material-ui/core';

import abclogo from '../assets/ABCLogoFull.svg';
import logo from '../assets/hrcLogo.svg';

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
            <Grid
                container
                justifyContent="center"
                alignItems="center"
            >
                <Grid container item xs justifyContent="flex-start"
                    alignItems="flex-start">
                    <img src={abclogo} alt={"ABC Products"} style={{ width: '250px' }} />
                </Grid>
                <Grid item xs>
                    <img src={logo} alt={"highradius"} style={{ width: '190px' }} />
                </Grid>
                <Grid item xs>
                    
                </Grid>
            </Grid>
        </div>

    );
}