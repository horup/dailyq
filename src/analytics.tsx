import { Box, Grid, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import * as state from './state';

export function Score({ scoreValue }: { scoreValue: number | undefined }) {
    let reds = [] as number[];
    let greens = [] as number[];
    for (let i = 0; i <= 10; i++) {
        greens[i] = 255 / 10 * i;
        reds[i] = 255 - 255 / 10 * i;
    }
    let color = 'lightgrey';
    if (scoreValue != null) {
        color = `rgb(${reds[scoreValue]}, ${greens[scoreValue]}, 0)`;
    }
    return (
        <Typography style={{ color: color }}>{scoreValue != null ? scoreValue : '--'}</Typography>
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
                        <Typography variant='body1' fontWeight={600}>{q.question}</Typography>
                    </Grid>
                    {days.map((day) => {
                        return (
                            <Grid textAlign={'left'} style={{ marginBottom: '32px' }} key={day} item xs={1}>
                                <Score scoreValue={q.score[day]} />
                            </Grid>
                        )
                    })}
                </React.Fragment>)
        })}
    </Grid></Box>
}