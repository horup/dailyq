import { Box, Button, Paper, TableBody, TableCell, TableContainer, TextField, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow/TableRow';
import { Stack } from '@mui/system';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import * as state from './state';

export function Configure() {

    const [questions, setQuestions] = useRecoilState(state.questionsState);
    const [newQuestion, setNewQuestion] = React.useState("");

    const onDelete = (index: number, q: string) => {
        let sure = window.confirm("Are you sure you want to delete the question: " + q);
        if (sure) {
            let qs = [...questions];
            qs.splice(index, 1);
            setQuestions(qs);
        }
    }
    const onAdd = () => {
        if (newQuestion.length == 0) {
            return;
        }

        let qs = [...questions];
        qs.push({
            question: newQuestion,
            score: {}
        });

        setNewQuestion("");
        setQuestions(qs);
    }

    return <>
        <Box padding={2}>
            <Typography variant='body1' fontWeight={600}>Questions</Typography>
        </Box>
        <Table className='configure' size='small'>
            <TableBody>
                {questions.map((q, index) => {
                    return (
                        <TableRow key={index}>
                            <TableCell>
                                <Typography variant='body1'>{q.question}</Typography>
                            </TableCell>
                            <TableCell className='cell-button' align='right'>
                                <Button size='small' variant='contained' color='error' onClick={() => onDelete(index, questions[index].question)}>DEL</Button>
                            </TableCell>
                        </TableRow>);
                })}
            </TableBody>
        </Table>
        <Box padding={2}>
            <Stack spacing={2}>
                <Typography variant='body1' fontWeight={600}>Add new Question</Typography>
                <TextField multiline={true} value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} size='small' style={{ width: '100%' }} variant='outlined'></TextField>
                <Button size='small' variant='contained' onClick={() => onAdd()}>Add</Button>
            </Stack>
        </Box>
    </>
}