import React, { useState } from "react";
import { Button, ButtonGroup, makeStyles } from '@material-ui/core/';
import AdvanceSearchDialog from "./AdvanceSearchDialog";
import DeleteDialog from './DeleteDialog';
import AddDialog from './AddDialog';
import EditDialog from './EditDialog';

const useStyles = makeStyles(() => ({
    rootRoot: {
        padding: '25px 14px 10px'
    },
}))

export default function LeftButtonGroup() {
    const [advanceSearchDialog, setAdvanceSearchDialog] = useState(false);
    const classes = useStyles();

    return (
        <div className={classes.rootRoot}>
            <ButtonGroup style={{ display: 'flex', width: '100%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: "flex-start"}} aria-label="outlined button group">
                <Button style={{
                    width: '100%', backgroundColor: '#4fc3f7', color: '#fff', borderColor: '#fff'
                }} variant="contained" disableElevation>predict</Button>
                <Button style={{ width: '100%', color: '#fff', borderColor: '#4fc3f7' }}>analytics view</Button>
                <Button onClick={() => setAdvanceSearchDialog(true)} style={{ width: '100%', color: '#fff', borderColor: '#4fc3f7' }}>advance search</Button>
            </ButtonGroup>
            <AdvanceSearchDialog open={advanceSearchDialog} closeDialog={() => setAdvanceSearchDialog(false)}/>
        </div>
    );
}