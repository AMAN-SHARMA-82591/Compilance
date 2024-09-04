import React from 'react'
import * as PropTypes from 'prop-types';
import { compose } from 'ramda';
import { withRouter } from 'react-router-dom';
import withStyles from '@mui/styles/withStyles';
import { Button, CircularProgress, Grid, IconButton, Typography } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TaskField from '../../../Common/TaskField';
import "../../../../App.css"
import { useSelector } from 'react-redux';

const styles = () => ({
    TasksMain: {
        marginBottom: '50px',
    },
    heading: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '40px',
    },
});

function Tasks({ classes, history }) {
    const { data, isLoading } = useSelector((state) => state.taskList);
    return (
        <div className={classes.TasksMain}>
            <div className={classes.heading}>
                <Typography variant='h4'>
                    Tasks
                </Typography>
                <Button
                    color='secondary'
                    variant='contained'
                    onClick={() => history.push('/tasks')}
                    endIcon={<ChevronRightIcon />}
                >

                    View All
                </Button>
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

        </div>
    )
}

Tasks.propTypes = {
    classes: PropTypes.object,
    history: PropTypes.object,
};


export default compose(withStyles(styles), withRouter)(Tasks);