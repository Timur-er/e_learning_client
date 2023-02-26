import React, {useEffect, useState} from 'react';
import PageContainer from "../../Components/PageContainer/PageContainer";
import {getAllUsers} from "../../http/userAPI";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";

const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'full_name', headerName: 'Full name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'birthday', headerName: 'Birthday', flex: 1 },
    {
        field: 'phone_number',
        headerName: 'Phone number',
        type: 'number',
        flex: 1,
    },
    { field: 'newsletter', headerName: 'Newsletter', flex: 1 },
    { field: 'courses', headerName: 'Courses', flex: 1 },
]

const UsersPage = () => {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const fetched_users = await getAllUsers();
        const formatForTable = fetched_users.data.map(user => {
            return {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                phone_number: user.phone_number,
                birthday: user.birth_date,
                newsletter: 'false',
                courses: 'all user courses will be here'
            }
        })
        setUsers(formatForTable)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <PageContainer>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    components={{ Toolbar: GridToolbar }}
                    componentsProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                        },
                    }}
                />

            </div>
        </PageContainer>
    );
};

export default UsersPage;