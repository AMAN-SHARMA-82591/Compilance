import React from 'react'
import * as PropTypes from 'prop-types';
import { compose } from 'ramda'
import withStyles from '@mui/styles/withStyles';
import { Typography } from '@mui/material'
import "../../../../App.css"

const styles = () => ({
    progressMain: {
        display: 'flex',
        maxWidth: '100%',
        width: '1200px',
        height: '300px',
        alignItems: 'end',
        marginBottom: '50px',
        paddingLeft: '50px',
        justifyContent: 'space-between',
    },
    progressbox: {
        width: '240px',
        height: '180px',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: '20px',
        color: 'white',
    },
});

function ProgressOverview({ classes }) {
    return (
        <div className={classes.progressMain}>
            <div className={classes.progressbox} style={{ background: '#e9523f'}}>
                <Typography variant='h1'>
                    8
                </Typography>
                <Typography>
                    Overdue
                </Typography>
            </div>
            <div className={classes.progressbox} style={{ background: '#6773fd'}}>
                <Typography variant='h1'>
                    8
                </Typography>
                <Typography>
                    Upcoming
                </Typography>
            </div>
            <div className={classes.progressbox} style={{ background: '#f8b84a'}}>
                <Typography variant='h1'>
                    8
                </Typography>
                <Typography>
                    In Progress
                </Typography>
            </div>
            <div className={classes.progressbox} style={{ background: '#1da193'}}>
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


export default compose(withStyles(styles))(ProgressOverview);