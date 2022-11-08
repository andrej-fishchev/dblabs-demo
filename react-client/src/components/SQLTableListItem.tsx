import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";

interface ISQLTableListItem {
    id: string,
    icon: any,
    name: string,
    props: any
}

export default function SQLTableListItem (props: ISQLTableListItem): JSX.Element {

    return (
        <ListItem key={ props.name } >
            <ListItemButton key={ props.name }
                            sx={{ py: 0, minHeight: 32 }}>

                <ListItemIcon sx={{ color: 'inherit' }}>
                    {props.icon}
                </ListItemIcon>

                <ListItemText
                    primary={props.name}
                    primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                />

            </ListItemButton>
        </ListItem>
    );
}