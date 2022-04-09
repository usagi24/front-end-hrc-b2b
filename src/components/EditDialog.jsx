import React, { useState } from "react";
import { Grid, Paper, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, useMediaQuery, useTheme, makeStyles } from "@material-ui/core/";
import axios from "axios";
import { Alert } from '@material-ui/lab';

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
            borderColor: '#D1D1D1'
        }
    },
}));

export default function EditDialog(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();

    const [invoiceCurrency, setInvoiceCurrency] = useState('');
    const [customerPaymentTerms, setCustomerPaymentTerms] = useState('');

    const [open, setOpen] = useState(true);
    const [resultState, setResultState] = useState(false);
    const [error, setError] = useState(false);

    function editData() {
        props.handleIsBackdropOpen(true);
        axios({
            url: '/UpdateData',
            method: 'get',
            baseURL: 'http://localhost:8080/hrcservlet/',
            params: {
                sl_no: String(props.getSl_no()),
                invoice_currency: invoiceCurrency === '' ? null : invoiceCurrency,
                cust_payment_terms: customerPaymentTerms === '' ? null : customerPaymentTerms,
            }
        }).then((res) => {
            setToDefault();
            props.fetchData();
            props.setSortModeDefault();
            props.closeDialog();
            setTimeout(() => {
                setError(!res.data);
                setResultState(true);
            }, 5000)
            setTimeout(() => {
                setError(false);
                setResultState(false);
            }, 6500)
            setTimeout(() => {
                props.handleIsBackdropOpen(false);
            }, 5000)
        })
    }

    function setToDefault() {
        setInvoiceCurrency('');
        setCustomerPaymentTerms('');
    }

    return (
        <>
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
                    {"Edit"}
                </DialogTitle>
                <DialogContent>
                    <Grid container direction="row" spacing={2}>
                        <Grid container item xs>
                            <Paper className={classes.root} >
                                <TextField label="Invoice Currency" onChange={(event) => setInvoiceCurrency(event.target.value)} />
                            </Paper>
                        </Grid>
                        <Grid container item xs>
                            <Paper className={classes.root}>
                                <TextField label="Customer Payment Terms" onChange={(event) => setCustomerPaymentTerms(event.target.value)} />
                            </Paper>
                        </Grid>
                    </Grid>
                    <br />
                </DialogContent>
                <DialogActions>
                    <Grid xs={6}>
                        <Button
                            classes={{ root: classes.inputRoot }}
                            fullWidth={true}
                            variant="outlined"
                            autoFocus
                            color="primary"
                            disabled={
                                invoiceCurrency === '' && customerPaymentTerms === ''
                            }
                            onClick={() => editData()}
                        >
                            Edit
                        </Button>
                    </Grid>
                    <Grid xs={6}>
                        <Button
                            classes={{ root: classes.inputRoot }}
                            fullWidth={true}
                            variant="outlined"
                            onClick={() => {
                            props.closeDialog();
                            setToDefault();
                        }} color="primary" autoFocus>
                            Cancel
                        </Button>
                    </Grid>
                </DialogActions>
            </Dialog>
            {
                resultState && <>
                    {
                        error ? <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                            <Alert severity="error">
                                Error!
                            </Alert>
                        </Snackbar> : <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                            <Alert severity="success">
                                Edited Successfully!
                            </Alert>
                        </Snackbar>
                    }
                </>
            }
        </>
    );
}
