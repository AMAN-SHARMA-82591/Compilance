import React from 'react'
import * as PropTypes from 'prop-types';
import { compose } from 'ramda'
import withStyles from '@mui/styles/withStyles';
import { Button, Grid, IconButton, Typography } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Description from '@mui/icons-material/Description'
import MoreVert from '@mui/icons-material/MoreVert';
import RecentlyMissedField from '../Common/RecentlyMissedField';
import "../../App.css"

const styles = () => ({
    recentlyMissedMain: {
        marginBottom: '50px',
    },
    heading: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '40px',
    },
});

function RecentlyMissed({ classes }) {
    return (
        <div className={classes.recentlyMissedMain}>
            <div className={classes.heading}>
                <Typography variant='h4'>
                    Today's Tasks
                </Typography>
                <Button variant='contained' color='secondary' endIcon={<ChevronRightIcon />}>
                    View All
                </Button>
            </div>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <RecentlyMissedField />
                </Grid>
                <Grid item xs={6}>
                    <RecentlyMissedField />
                </Grid>
                <Grid item xs={6}>
                    <RecentlyMissedField />
                </Grid>
                <Grid item xs={6}>
                    <RecentlyMissedField />
                </Grid>
            </Grid>

        </div>
    )
}

RecentlyMissed.propTypes = {
    classes: PropTypes.object,
};


export default compose(withStyles(styles))(RecentlyMissed);