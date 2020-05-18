import React from "react";
import {Button, ButtonGroup} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {Link} from "react-router-dom";

export default function CustomButtonGroup(props) {
    return (
        <ButtonGroup color="primary" aria-label="outlined primary button group">

            <Button aria-label="edit">
                <Link to={`/order/${props.selectedOrderID}`} style={{textDecoration: 'none'}}>
                    <EditIcon fontSize="small"/>
                </Link>
            </Button>

            <Button aria-label="delete">
                <DeleteIcon fontSize="small"/>
            </Button>
        </ButtonGroup>)
};