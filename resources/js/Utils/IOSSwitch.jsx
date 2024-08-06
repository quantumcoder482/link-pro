import React from 'react';
import {styled} from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const IOSSwitch = styled((props) => (
    <Switch {...props} />
))(({ theme }) => ({
    width: 58,
    height: 24,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '800ms',
        '&.Mui-checked': {
            transform: 'translateX(34px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#424fcf',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#ffffff',
            border: '6px solid #ffffff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: '#ffffff',
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        color: '#ffffff',
        boxSizing: 'border-box',
        width: 20,
        height: 20,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? 'rgb(136, 136, 136)' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

export default IOSSwitch;
