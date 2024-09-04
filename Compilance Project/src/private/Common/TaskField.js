import React, { useState } from 'react'
import * as PropTypes from 'prop-types';
import { compose } from 'ramda'
import withStyles from '@mui/styles/withStyles';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send';
import { AvatarGroup, Avatar, Button, Divider, IconButton, LinearProgress, Popover, Typography } from '@mui/material'
import Description from '@mui/icons-material/Description'
import MoreVert from '@mui/icons-material/MoreVert';
import "../../App.css"

const styles = () => ({
    recentItem: {
        background: '#e4e4e4',
        border: '1px solid #c6c4c4',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '6px',
    }
});

function TaskField({ classes, data }) {
    const [anchorEl, setAnchorEl] = useState(null);

    function handleOpenPopover(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClosePopover() {
        setAnchorEl(null);
    }
    return (
        <>
            <div className={classes.recentItem}>
                <div style={{ display: 'flex' }}>
                    <IconButton style={{ pointerEvents: 'none' }} disableFocusRipple disableRipple size='small' color='primary'>
                        <Description />
                    </IconButton>
                    <Typography variant='h6'>
                        {data.title && data.title}
                    </Typography>
                </div>
                <IconButton ref={anchorEl} onClick={handleOpenPopover} style={{ color: 'black' }} size='small'>
                    <MoreVert />
                </IconButton>
                <Popover
                    id='simple-popover'
                    anchorEl={anchorEl}
                    open={anchorEl}
                    onClose={handleClosePopover}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    sx={{ borderRadius: '20px' }}
                >
                    <div style={{ backgroundColor: '#0000ffb0' }}>
                        <div style={{ background: 'white', width: '400px', padding: '10px', borderRadius: '0px 0px 15px 15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <Typography variant='subtitle2'>
                                        June 1, 2020
                                    </Typography>
                                    <Typography variant='h6'>
                                        {data.title && data.title}
                                    </Typography>
                                </div>
                                <span>{data.status && data.status}</span>
                            </div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                                    <Typography variant='subtitle2'>
                                        Process
                                    </Typography>
                                    <Typography variant='subtitle2'>
                                        0%
                                    </Typography>
                                </div>
                                <LinearProgress value={50} variant='determinate' />
                            </div>
                            <Divider variant='fullWidth' orientation='horizontal' />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', alignItems: 'center' }}>
                                <span>
                                    High
                                </span>
                                <AvatarGroup spacing='small' style={{ width: '100px' }} max={4}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                                </AvatarGroup>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', color: 'white' }}>
                            <Typography>
                                Assign To
                            </Typography>
                            <div>
                                <SendIcon />
                                <ChatBubbleIcon />
                            </div>
                        </div>
                    </div>
                </Popover>
            </div>
        </>
    )
}

TaskField.propTypes = {
    data: PropTypes.object,
    classes: PropTypes.object,
};


export default compose(withStyles(styles))(TaskField);