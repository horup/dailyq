import { Box, Grid, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { getColor } from './colors';
import * as state from './state';

export function Score({ scoreValue }: { scoreValue: number | undefined }) {
    let color = getColor(scoreValue as any);
    return (
        <Typography variant='caption' style={{ color: color }}>{scoreValue != null ? scoreValue : '--'}</Typography>
    )
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
        {questions.map((q, index) => {
            return (
                <React.Fragment key={index}>
                    <Grid xs={12} item key={index}>
                        <Typography variant='body1'>{q.question}</Typography>
                    </Grid>
                    {days.map((day) => {
                        return (
                            <Grid textAlign={'left'} key={day} item xs={1}>
                                <Score scoreValue={q.score[day]} />
                            </Grid>
                        )
                    })}
                </React.Fragment>)
        })}
    </Grid></Box>
}