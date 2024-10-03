import React from 'react'
import * as PropTypes from 'prop-types';
import { compose } from 'ramda';
import { withRouter } from 'react-router-dom';
import withStyles from '@mui/styles/withStyles';
import { CircularProgress, Grid, IconButton, Typography } from '@mui/material'
import TaskField from '../../../Common/TaskField';
import "../../../../App.css"
import { useSelector } from 'react-redux';

const styles = () => ({
    heading: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '40px',
    },
});

function Tasks({ classes, history }) {
    const { data, isLoading } = useSelector((state) => state.taskList);
    return (
        <main className='tasks-main'>
            <div className='task-heading'>
                <Typography variant='h4'>
                    Tasks
                </Typography>
                <button
                    onClick={() => history.push('/tasks')}
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
    history: PropTypes.object,
};


export default compose(withStyles(styles), withRouter)(Tasks);