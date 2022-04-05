import React, { useState } from "react";
import { Grid, Paper, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme, makeStyles } from "@material-ui/core/";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            width: '28ch',
        },
    },
    inputRoot: {
        color: '#fff',
        borderColor: '#fff',
        '&:hover': {
            borderColor: '#fff',
        },
        '&:disabled': {
            opacity: 0.6,
            color: '#D1D1D1',
            borderColor: '#D1D1D1',
        }
    },
}));

export default function AnalyticsDialog(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();

    const [clearDate, setClearDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [baselineCreateDate, setBaselineCreateDate] = useState('');
    const [invoiceCurrency, setInvoiceCurrency] = useState('');

    // function advancedSearch() {
    //     props.handleIsBackdropOpen(true);
    //     props.closeDialog();
    //     axios({
    //         url: '/AdvancedSearch',
    //         method: 'get',
    //         baseURL: 'http://localhost:8080/hrcservlet/',
    //         params: {
    //             doc_id: documentId === '' ? null : documentId,
    //             invoice_id: invoiceId === '' ? null : invoiceId,
    //             cust_number: customerNumber === '' ? null : customerNumber,
    //             buisness_year: businessYear === '' ? null : businessYear,
    //         }
    //     }).then((res) => {
    //         const data = res.data;
    //         props.setAdvancedSearchData(data);
    //         props.handleIsBackdropOpen(false);
    //     })
    // }

    return (
        <Dialog
            PaperProps={{
                style: {
                    backgroundColor: "#2D4250",
                },
            }}
            fullScreen={fullScreen}
            open={props.open}
            onClose={() => props.closeDialog()}
        >

            <DialogTitle
                classes={{
                    root: classes.inputRoot
                }}
            >
                {"Analytics View"}
            </DialogTitle>
            <DialogContent>
                <Grid container direction="row" spacing={2}>
                    <Grid justifyContent="center" container item xs>
                        <Paper className={classes.root} >
                            <TextField value={clearDate} label="Clear Date" onChange={(event) => {
                                setClearDate(event.target.value);
                            }} />
                        </Paper>
                    </Grid>
                    <Grid justifyContent="center" container item xs>
                        <Paper className={classes.root}>
                            <TextField value={dueDate} label="Due in Date" onChange={(event) => {
                                setDueDate(event.target.value);
                            }} />
                        </Paper>
                    </Grid>
                    <Grid justifyContent="center" container item xs>
                        <Paper className={classes.root}>
                            <TextField value={baselineCreateDate} label="Baseline Create Date" onChange={(event) => {
                                setBaselineCreateDate(event.target.value);
                            }} />
                        </Paper>
                    </Grid>
                    <Grid justifyContent="center" container item xs>
                        <Paper className={classes.root}>
                            <TextField value={invoiceCurrency} label="Invoice Currency" onChange={(event) => {
                                setInvoiceCurrency(event.target.value);
                            }} />
                        </Paper>
                    </Grid>
                </Grid>
                <br />
            </DialogContent>
            <DialogActions>
                <Grid xs={6}>
                    <Button classes={{
                        root: classes.inputRoot
                    }} fullWidth={true} variant="outlined" autoFocus onClick={() => props.closeDialog()} color="primary"
                        disabled={
                            clearDate === '' &&
                            dueDate === '' &&
                            baselineCreateDate === '' &&
                            invoiceCurrency === ''
                        }
                    >
                        Submit
                    </Button>
                </Grid>
                <Grid xs={6}>
                    <Button classes={{
                        root: classes.inputRoot
                    }} fullWidth={true} variant="outlined" onClick={() => {
                        props.closeDialog();
                        setClearDate('');
                        setDueDate('');
                        setBaselineCreateDate('');
                        setInvoiceCurrency('');
                    }} color="primary" autoFocus>
                        Cancel
                    </Button>
                </Grid>
            </DialogActions>
        </Dialog>
    );
}
