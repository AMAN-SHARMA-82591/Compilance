import React from 'react'
import * as PropTypes from 'prop-types';
import { compose } from 'ramda';
import withStyles from '@mui/styles/withStyles';
import { CircularProgress, IconButton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import TaskField from '../../../Common/TaskField';
import "../../../../App.css"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const styles = () => ({
    heading: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '40px',
    },
});

function Tasks({ classes }) {
    const { data, isLoading } = useSelector((state) => state.taskList);
    const navigate = useNavigate();
    return (
        <main className='tasks-main'>
            <div className='task-heading'>
                <Typography variant='h4'>
                    Tasks
                </Typography>
                <button
                    onClick={() => navigate('/tasks')}
                >

                    View All
                </button>
            </div>
            <Grid container spacing={3}>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <>
                        {data.taskList.slice(0, 4).map((task, i) => (
                            <Grid key={i} item xs={6}>
                                <TaskField data={task} />
                            </Grid>
                        ))}
                    </>
                )}
            </Grid>

        </main>
    )
}

Tasks.propTypes = {
    classes: PropTypes.object,
};


export default compose(withStyles(styles))(Tasks);