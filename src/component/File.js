import React from 'react';
import { FileEarmarkText } from 'react-bootstrap-icons';

const File = (props) => {
    const { fileName } = props
    return (
        <div className='file'>
            <p><span><FileEarmarkText/></span>{fileName}</p>
        </div>
    )
}

export default File
