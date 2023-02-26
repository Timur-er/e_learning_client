import React from 'react';
import PageContainer from "../../Components/PageContainer/PageContainer";
import Typography from "@mui/material/Typography";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import Button from "@mui/material/Button";

const columns = [
    {field: 'id', headerName: 'ID', flex: 0.2},
    {field: 'course_name', headerName: 'Course name', flex: 1},
    {field: 'favourites', headerName: 'In favourites', flex: 1},
    {field: 'students', headerName: 'Students', flex: 1},
    {
        field: "action",
        flex: 1,
        headerName: "Action",
        sortable: false,
        renderCell: (params) => {
            const onClick = (e) => {
                console.log('click');
                console.log(params);
            };

            return <Button onClick={onClick}>Some type of action...</Button>;
        }
    },
]

const rows = [
    {id: 1, course_name: 'course name', favourites: 123, students: 23},
    {id: 2, course_name: 'course name', favourites: 123, students: 23},
    {id: 3, course_name: 'course name', favourites: 123, students: 23},
    {id: 4, course_name: 'course name', favourites: 123, students: 23},
    {id: 5, course_name: 'course name', favourites: 123, students: 23},
    {id: 6, course_name: 'course name', favourites: 123, students: 23},
    {id: 7, course_name: 'course name', favourites: 123, students: 23},
    {id: 8, course_name: 'course name', favourites: 123, students: 23},
    {id: 9, course_name: 'course name', favourites: 123, students: 23},
    {id: 10, course_name: 'course name', favourites: 123, students: 23},
    {id: 11, course_name: 'course name', favourites: 123, students: 23},
    {id: 12, course_name: 'course name', favourites: 123, students: 23},
]

const CourseStatisticPage = () => {
    return (
        <PageContainer>
            <Typography variant='h3' color='secondary'>
                Course statistics page
            </Typography>

            <div style={{height: 500, width: '100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    components={{Toolbar: GridToolbar}}
                    componentsProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: {debounceMs: 500},
                        },
                    }}
                />

            </div>
        </PageContainer>
    );
};

export default CourseStatisticPage;