import React from 'react';
import PageContainer from "../../Components/PageContainer/PageContainer";
import MenuItem from "@mui/material/MenuItem";
import {Divider, ListItemIcon, ListItemText, MenuList, Paper} from "@mui/material";
import {Cloud, ContentCopy, ContentCut, ContentPaste} from "@mui/icons-material";
import Typography from "@mui/material/Typography";

const UserPage = () => {
    return (
        <PageContainer>
            <Paper sx={{width: 200, maxWidth: '100%'}}>
                <MenuList>
                    <MenuItem>
                        <ListItemIcon>
                            <ContentCut fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Favourite courses</ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <ContentCopy fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Bought courses</ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <ContentPaste fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Account settings</ListItemText>
                    </MenuItem>
                </MenuList>
            </Paper> </PageContainer>
    );
};

export default UserPage;