import React, { useState } from "react";
import { Button, ButtonGroup } from '@material-ui/core/';
import DeleteDialog from './DeleteDialog';
import AddDialog from './AddDialog';
import EditDialog from './EditDialog';

export default function RightButtonGroup(props) {

    const [addDialog, setAddDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);


    return (
        <div style={{padding: '25px 14px 10px'}}>
            <ButtonGroup style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'flex-end', justifyContent: "flex-end" }} aria-label="outlined button group">
                
                <Button onClick={() => setAddDialog(true)} style={{width: '100%', color: '#fff', borderColor: '#4fc3f7'}}>add</Button>
                <Button onClick={() => setEditDialog(true)} style={{ width: '100%', color: '#fff', borderColor: '#203239 transparent #203239 transparent' }}>edit</Button>
                <Button onClick={() => setDeleteDialog(true)}
                style={{ width: '100%', color: '#fff', borderColor: '#4fc3f7' }}>delete</Button>
            </ButtonGroup>
            <AddDialog open={addDialog} closeDialog={() => setAddDialog(false)}/>
            <EditDialog open={editDialog} closeDialog={() => setEditDialog(false)}/>
            <DeleteDialog open={deleteDialog} closeDialog={() => setDeleteDialog(false)}/>
        </div>
    );
}