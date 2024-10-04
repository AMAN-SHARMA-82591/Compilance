import React from 'react'
import * as PropTypes from 'prop-types';
import { compose } from 'ramda'
import withStyles from '@mui/styles/withStyles';
import { Box, MenuItem, Select, Typography } from '@mui/material'
import "../../../../App.css"

const styles = () => ({
    recentlyMissedMain: {
        padding: '0px 50px',
    },
});

function PlanMeeting({ classes }) {
    return (
        <>
            <div className={classes.heading}>
                <Typography gutterBottom variant='h4'>
                    Plan Meeting
                </Typography>
            </div>
            <Box
                sx={{
                    width: 400,
                }}
            >
                <Select fullWidth variant='outlined'>
                    <MenuItem value=''>None</MenuItem>
                    <MenuItem value='1'>1</MenuItem>
                </Select>
            </Box>
        </>
    )
}

PlanMeeting.propTypes = {
    classes: PropTypes.object,
};


export default compose(withStyles(styles))(PlanMeeting);