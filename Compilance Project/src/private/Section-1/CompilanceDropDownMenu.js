import React from 'react'
import Progress from '@material-ui/core/LinearProgress'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SendIcon from '@material-ui/icons/Send';
function CompilanceDropDownMenu(props) {
    return (
        <div style={{top:props.top,right:props.right}} className="compilance-dropDown-section">
            <div className="compilance-dropdown-main-sec-cont-1">
                <p> June 20,2020</p>
                <div className="compilance-dropdown-pending-button">
                    <p>Compilance 1</p>
                    <button>Pending</button>
                </div>
                <div className="compilance-dropdown-process-section">
                    <p>Process</p>
                    <p>0%</p>
                </div>
                <hr style={{margin:'0px 8px 10px 8px'}}></hr>
                
                <div className="compilance-dropdown-progress-bar">
                    <Progress  variant="determinate" value={60} />
                </div>
                <div className="compilance-dropdown-high-cont">
                    <button>High</button>

                </div>


            </div>


            <div className="compilance-dropdown-main-sec-cont-2">
                    <div className="compilance-dropdown-logo-cont-2">
                            <p>Asign To</p>
                            <h1>@Vicky</h1>
                    </div>
                    <div className="compilance-dropdown-logo-cont-3">
                        <QuestionAnswerIcon fontSize="large" />
                        <SendIcon fontSize="large"/>
                    </div>
            </div>
        </div>
    )
}

export default CompilanceDropDownMenu
