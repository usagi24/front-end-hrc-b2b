import React from 'react';
import { Paper, TextField, Grid, makeStyles } from '@material-ui/core/';

const useStyles = makeStyles(() => ({
    root: {
        '& .MuiTextField-root': {
            height: '5.5ch',
        },
        ' & .MuiPaper-root': {
            backgroundColor: '#fff',
            elevation: '3',
        }
    },
    
}));

export default function Search() {

    const classes = useStyles();
    return (
        <Grid container >

        <Paper elavation={3}>
                <TextField size='small' height='5.5ch' id="filled-search" label="Search Customer ID" type="search" variant="filled" />
            </Paper>
        </Grid>
    );
}
