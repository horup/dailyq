import { Box, Button, Paper, TableBody, TableCell, TableContainer, TextField, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow/TableRow';
import { Stack } from '@mui/system';
import { DateTime } from 'luxon';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import * as state from './state';

export function Configure() {
    const restoreFileRef = React.useRef<HTMLInputElement>();
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

    const onBackup = ()=>{
        let now = DateTime.now().toISODate({
        });
        let state = {
            majorVersion:1,
            magic:'DAILYQ',
            questions:questions,
        }

        const blob = new Blob([JSON.stringify(state)], {type : 'application/json'});
        const a = document.createElement('a');
        a.download = `DailyQ_${now}.json`;
        a.href = URL.createObjectURL(blob);
        a.addEventListener('click', (e) => {
            setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
        });
        a.click();
        alert('Backup named ' + a.download + ' was downloaded to your device');
    }

    const onRestore = (file:File)=>{
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = (evt) => {
            try {
                let backup = JSON.parse(evt.target.result as any);
                if (backup.magic != 'DAILYQ') {
                    throw 'unknown file format';
                }
                if (backup.majorVersion != 1) {
                    throw 'Unknown Major Version';
                } 
                if (backup.questions === undefined) {
                    throw 'Missing questions field';
                }

                setQuestions(backup.questions);
                alert('Success: backup was restored!');
            }
            catch (e) {
                alert('Failed: to restore backup with error: ' + e);
            }
        }

        reader.onerror = (evt) => {
            alert('Failed: to read backup file');
        }
    }

    return <>
        <Box padding={2}/>
        <Paper>
            <Box padding={2}>
                <Typography variant='h5'>Questions</Typography>
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
        </Paper>
        <Box padding={2}/>
        <Paper>
            <Box padding={2}>
                <Typography variant='h5'>Backup and Restore</Typography>
                <Typography variant='subtitle1'>Back or Restore your App below</Typography>
            </Box>
                <Box padding={2}>
                    <Button size='large' fullWidth variant='contained' onClick={()=>onBackup()}>Backup</Button>
                </Box>
                <Box padding={2}>
                    <Button size='large' fullWidth variant='contained' onClick={()=>restoreFileRef.current.click()}>Restore</Button>
                </Box>
                <input onChange={(e)=>onRestore(e.target.files[0])} type='file'  id='file' accept='application/json' ref={restoreFileRef} style={{display: 'none'}}/>
        </Paper>
        <Box padding={2}/>
    </>
}