import React, { useState } from "react";
import { Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, useMediaQuery, useTheme, makeStyles } from "@material-ui/core/";
import axios from "axios";
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({

    inputRoot: {
        color: '#fff',
        borderColor: '#fff',
        '&:hover': {
            borderColor: '#fff',
        }
    },
}));

export default function DeleteDialog(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();

    const [open, setOpen] = useState(true);
    const [resultState, setResultState] = useState(false);
    const [error, setError] = useState(false);

    function deleteData() {
        props.handleIsBackdropOpen(true);
        axios({
            url: '/DeleteData',
            method: 'get',
            baseURL: 'http://localhost:8080/hrcservlet/',
            params: {
                sl_no: String(props.getSl_no()),
            }
        }).then((res) => {
            props.fetchData();
            props.setSortModeDefault();
            props.closeDialog();
            setTimeout(() => {
                setError(!res.data);
                setResultState(true);
            }, 9000)
            setTimeout(() => {
                setError(false);
                setResultState(false);
            }, 10000)
            setTimeout(() => {
                props.handleIsBackdropOpen(false);
            }, 9000)
        })
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
                    {"Delete Records?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        classes={{
                            root: classes.inputRoot
                        }}
                    >
                        Are you sure you want to delete these record[s]?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Grid xs={6}>

                        <Button classes={{
                            root: classes.inputRoot
                        }} fullWidth={true} variant="outlined" autoFocus onClick={() => props.closeDialog()} color="primary">
                            Cancel
                        </Button>
                    </Grid>
                    <Grid xs={6}>

                        <Button classes={{
                            root: classes.inputRoot
                        }} fullWidth={true} variant="outlined" onClick={() => deleteData()} color="primary" autoFocus>
                            Delete
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
                                Deleted Successfully!
                            </Alert>
                        </Snackbar>
                    }
                </>
            }
        </>
    );
}
