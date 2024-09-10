import React from 'react'
import * as PropTypes from 'prop-types';
import { compose } from 'ramda'
import { withRouter } from 'react-router-dom';
import withStyles from '@mui/styles/withStyles';
import { Typography } from '@mui/material'
import "../../../../App.css"
import { useDispatch, useSelector } from 'react-redux';
import { taskFilterAction } from '../../../../store/actions';

const styles = () => ({
    progressMain: {
        display: 'flex',
        maxWidth: '100%',
        width: '1200px',
        height: '220px',
        alignItems: 'end',
        marginBottom: '50px',
        justifyContent: 'space-between',
    },
    progressbox: {
        width: '240px',
        height: '180px',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: '20px',
        color: 'white',
        cursor: 'pointer',
    },
});

function ProgressOverview({ classes, history }) {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.taskFilterType);

    const handleChange = (type) => {
        dispatch(taskFilterAction(type));
        history.push('/tasks');
    }

    return (
        <div className={classes.progressMain}>
            <div onClick={() => handleChange('overdue')} className={classes.progressbox} style={{ background: '#e9523f' }}>
                <Typography variant='h1'>
                    8
                </Typography>
                <Typography>
                    Overdue
                </Typography>
            </div>
            <div onClick={() => handleChange('upcoming')} className={classes.progressbox} style={{ background: '#6773fd' }}>
                <Typography variant='h1'>
                    8
                </Typography>
                <Typography>
                    Upcoming
                </Typography>
            </div>
            <div onClick={() => handleChange('in-progress')} className={classes.progressbox} style={{ background: '#f8b84a' }}>
                <Typography variant='h1'>
                    8
                </Typography>
                <Typography>
                    In Progress
                </Typography>
            </div>
            <div onClick={() => handleChange('total')} className={classes.progressbox} style={{ background: '#1da193' }}>
                <Typography variant='h1'>
                    8
                </Typography>
                <Typography>
                    Total
                </Typography>
            </div>
        </div>
    )
}

ProgressOverview.propTypes = {
    classes: PropTypes.object,
};


export default compose(withStyles(styles), withRouter)(ProgressOverview);