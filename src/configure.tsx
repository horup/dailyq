import { Button, TableBody, TableCell, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow/TableRow';
import * as React from 'react';
export function Configure() {
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
                        <Button size='small' variant='contained' color='error'>Delete</Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                    </TableCell>
                    <TableCell align='right'>
                        <Button  size='small' variant='contained'>Add</Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </>
}