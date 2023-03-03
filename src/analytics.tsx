import { Box, Grid, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { getColor } from './colors';
import * as state from './state';

export function Score({ scoreValue }: { scoreValue: number | undefined }) {
    let color = getColor(scoreValue as any);
    let height = (scoreValue * 2) + 'px';
    return <div className='score-bar-score' style={{backgroundColor:color, height}} />;
}

export function Analytics() {
    const [questions] = useRecoilState(state.questionsState);
    let days = [] as string[];
    for (let i = 0; i < 12; i++) {
        let dt = DateTime.now().minus({ days: i });
        let dateKey = state.toDateKey(dt);
        days.push(dateKey);
    }
    days.reverse();
    return <Box padding={2}><Grid container>
        <Grid xs={6} item >
            <Typography color={'grey'} variant='caption'>Past</Typography>
        </Grid>
        <Grid xs={6} item style={{textAlign:'right'}}>
            <Typography color={'grey'} variant='caption'>Now</Typography>
        </Grid>
        {questions.map((q, index) => {
            return (
                <React.Fragment key={index}>
                    <Grid xs={12} item key={index}>
                        <Typography variant='body1'>{q.question}</Typography>
                    </Grid>
                    {days.map((day) => {
                        return (
                            <Grid alignContent={'flex-end'} key={day} item xs={1} className='score-bar' >
                                <Score scoreValue={q.score[day]} />
                            </Grid>
                        )
                    })}
                </React.Fragment>)
        })}
    </Grid></Box>
}