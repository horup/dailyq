import { Button, TableBody, TableCell, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow/TableRow';
import * as React from 'react';
export function Configure() {


    const onDelete = (id:string) => {
        let sure = window.confirm("Are you sure you want to delete the question?");
    }
    const onAdd = ()=>{
        let q = window.prompt("Provide a daily question","Did you do your bedst to eat healthy?");
        if (q == null || q.length == 0) {
            return;
        }


    }


    return <>
        <Table className='configure'>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Typography variant='h5'>Question</Typography>
                    </TableCell>
                    <TableCell>
                        
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Typography variant='h6'>Did you do your bedst to xyz?</Typography>
                    </TableCell>
                    <TableCell align='right'>
                        <Button size='small' variant='contained' color='error' onClick={()=>onDelete()}>Delete</Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                    </TableCell>
                    <TableCell align='right'>
                        <Button  size='small' variant='contained' onClick={()=>onAdd()}>Add</Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </>
}