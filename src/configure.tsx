import { Button, TableBody, TableCell, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow/TableRow';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import * as state from './state';

export function Configure() {

    const [questions, setQuestions] = useRecoilState(state.questionsState);

    const onDelete = (index:number, q:string) => {
        let sure = window.confirm("Are you sure you want to delete the question: " + q);
        if (sure) {
            let qs = [...questions];
            qs.splice(index, 1);
            setQuestions(qs);
        }
    }
    const onAdd = ()=>{
        let q = window.prompt("Provide a daily question","Did you do your bedst to eat healthy?");
        if (q == null || q.length == 0) {
            return;
        }

        let qs = [...questions];
        qs.push({
            question:q,
            score:{}
        });

        setQuestions(qs);
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
                {questions.map((q, index)=>{
                    return (
                        <TableRow key={index}>
                            <TableCell>
                                <Typography variant='h6'>{q.question}</Typography>
                            </TableCell>
                            <TableCell align='right'>
                                <Button size='small' variant='contained' color='error' onClick={()=>onDelete(index, questions[index].question)}>Delete</Button>
                            </TableCell>
                        </TableRow>);
                })}
                
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