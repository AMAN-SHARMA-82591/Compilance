import React, { useState } from 'react'
import MicIcon from '@material-ui/icons/Mic';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import "../App.css"


function CommunityMainMessgeSec(){
    let[inputText,setInputText] = useState("")
    // useEffect((e) =>{
    //     console.log(e)
    // })
    return(
        <>
            {inputText}
            <div className="community-main-message-section">
                    <div className="community-image-message"></div>
                    <input onKeyPress={(e) => setInputText(() =>{
                        if(e.key==='Enter'){
                            return e.target.value
                        }
                    })} className="community-text-input" type="text" />
                    <div className="community-text-message-logo">
                            <div>
                                <MicIcon />
                            </div>
                            <hr  />
                            <AttachFileIcon  className="com-list-items-logo-message" />
                            <SpellcheckIcon  className="com-list-items-logo-message"/>
                            <EmojiEmotionsIcon className="com-list-items-logo-message" />
                            <AlternateEmailIcon className="com-list-items-logo-message"/>
                    </div>
            </div>  
        </>
    )
}
export default CommunityMainMessgeSec
