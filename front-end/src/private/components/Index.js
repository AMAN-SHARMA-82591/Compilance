import React from 'react'
import * as PropTypes from 'prop-types';
import { compose } from 'ramda';
import withStyles from '@mui/styles/withStyles';

const styles = () => ({
    recentlyMissedMain: {
        padding: '0px 50px',
    },
});

function Index({ classes }) {
    return (
        <>
        </>
    )
}

Index.propTypes = {
    classes: PropTypes.object,
};


export default compose(withStyles(styles))(Index);