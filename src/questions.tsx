import { DateTime } from 'luxon';
import * as React from 'react';
import { dateKeyToString } from './state';
import * as state from './state';
import {useRecoilState} from 'recoil';
import Typography from '@mui/material/Typography';
import { Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

export function Questions() {
    const [dateKey, setDateKey] = useRecoilState(state.dateKeyState);
    const [questions, setQuestions] = useRecoilState(state.questionsState);
    const today = DateTime.now().toLocal();


    return <>
        <div style={{width:'100%', textAlign:'center'}}>
            <Typography variant='h5'>{dateKeyToString(dateKey)}</Typography>
        </div>
        <br/>
        <TableContainer component={Paper}>
            <Table size='small'>
                <TableBody>
                    {questions.map((q,index)=>{
                        let score = q.score[dateKey] ? q.score[dateKey] : '-';

                        return (
                            <TableRow key={index}>
                                <TableCell>{q.question}</TableCell>
                                <TableCell style={{width:'auto', textAlign:'right'}}><Button size='small' variant='contained'>{score}</Button></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>

    </>
}