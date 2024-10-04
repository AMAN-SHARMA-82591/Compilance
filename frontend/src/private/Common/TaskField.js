import React, { useState } from 'react'
import * as PropTypes from 'prop-types';
import { compose } from 'ramda'
import withStyles from '@mui/styles/withStyles';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send';
import { AvatarGroup, Avatar, Divider, IconButton, LinearProgress, Popover, Typography } from '@mui/material'
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
            <div className="recent-items">
                <div className="recent-items__header">
                    <div className="recent-items__title">
                        <IconButton className="recent-items__icon" disableFocusRipple disableRipple size="small" color="primary">
                            <Description />
                        </IconButton>
                        <Typography variant="h6">{data.title}</Typography>
                    </div>
                    <IconButton className="recent-items__more-button" onClick={handleOpenPopover} size="small">
                        <MoreVert />
                    </IconButton>
                </div>
                <Popover
                    id="simple-popover"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClosePopover}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    classes={{ paper: 'recent-items__popover' }}
                >
                    <div className="recent-items__popover-content">
                        <div className="recent-items__popover-header">
                            <div>
                                <Typography variant="subtitle2">June 1, 2020</Typography>
                                <Typography variant="h6">{data.title}</Typography>
                            </div>
                            <span className="recent-items__status">{data.status}</span>
                        </div>
                        <div className="recent-items__progress">
                            <div className="recent-items__progress-header">
                                <Typography variant="subtitle2">Process</Typography>
                                <Typography variant="subtitle2">0%</Typography>
                            </div>
                            <LinearProgress value={50} variant="determinate" />
                        </div>
                        <Divider />
                        <div className="recent-items__footer">
                            <span className="recent-items__priority">High</span>
                            <AvatarGroup max={4} className="recent-items__avatar-group">
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                            </AvatarGroup>
                        </div>
                        <div className="recent-items__actions">
                            <Typography>Assign To</Typography>
                            <div>
                                <IconButton size="small"><SendIcon /></IconButton>
                                <IconButton size="small"><ChatBubbleIcon /></IconButton>
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