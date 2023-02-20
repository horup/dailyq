import { DateTime } from 'luxon';
import * as React from 'react';
import { dateKeyToString } from './state';
import * as state from './state';
import {useRecoilState} from 'recoil';
import Typography from '@mui/material/Typography';
import { Button, Dialog, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

export function Questions() {
    const [selectedQuestion, setSelectedQuestion] = React.useState<number | null>(null);
    const [dateKey, setDateKey] = useRecoilState(state.dateKeyState);
    const [questions, setQuestions] = useRecoilState(state.questionsState);

    const onClickScore = (scoreValue:number) =>{
        if (selectedQuestion != null) {
            let qs = JSON.parse(JSON.stringify(questions));
            qs[selectedQuestion].score[dateKey] = scoreValue;
            setQuestions(qs);
            setSelectedQuestion(null);
        }
    }

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
                                <TableCell style={{width:'auto', textAlign:'right'}}><Button onClick={()=>setSelectedQuestion(index)} size='small' variant='contained'>{score}</Button></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        <Dialog open={selectedQuestion != null} onClose={()=>setSelectedQuestion(null)}>
            <Paper>
                <Grid padding={2} container={true} spacing={2}>
                    {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((scoreValue, index)=>{
                        return  <Grid key={index} item xs={12}><Button onClick={()=>onClickScore(scoreValue)} variant='contained' fullWidth>{scoreValue}</Button></Grid>
                    })}
                    
                </Grid>
            </Paper>
        </Dialog>
    </>
}