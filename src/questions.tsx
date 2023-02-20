import { DateTime } from 'luxon';
import * as React from 'react';
import { dateKeyToString } from './state';
import * as state from './state';
import {useRecoilState} from 'recoil';
import Typography from '@mui/material/Typography';
import { Button, Dialog, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

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

    const onPrev = ()=>{
        const dt = DateTime.fromSQL(dateKey).minus({days:1});
        setDateKey(state.toDateKey(dt));
    }

    const onNext = ()=>{
        const dt = DateTime.fromSQL(dateKey).plus({days:1});
        setDateKey(state.toDateKey(dt));
    }

    return <>
        <Grid container padding={1}>
            <Grid item xs={4}>
                <Button onClick={()=>onPrev()} startIcon={<ArrowBack/>}>Prev</Button>
            </Grid>
            <Grid item xs={4} textAlign={'center'}>
                <Typography variant='body1' fontWeight={600}>{dateKeyToString(dateKey)}</Typography>
                <Typography variant='subtitle2'>{dateKey}</Typography> 
            </Grid>
            <Grid item xs={4} textAlign={'right'}>
                <Button onClick={()=>onNext()} endIcon={<ArrowForward/>}>Next</Button>
            </Grid>
        </Grid>
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