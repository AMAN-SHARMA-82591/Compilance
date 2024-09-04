import { useField, useFormikContext } from 'formik'
import React from 'react';
import MuiTextField from '@mui/material/TextField';
import { isNil } from 'lodash';
//  Incomplete

export default function TextField(props) {
    const {
        size,
        value,
        fullWidth,
        placeholder,
        onchange,
        name,
    } = props;

    const [, meta] = useField(name);
    const { setFieldValue } = useFormikContext();
    console.log('TextField', name, meta);
    return (
        <MuiTextField
            name={name}
            size={size}
            value={value}
            onchange={onchange}
            fullWidth={fullWidth}
            placeholder={placeholder}
        // error={!isNil(meta.error)}
        />
    )
}
