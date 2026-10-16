export let selectFieldProps = {
    '& .MuiInputLabel-root': {
        color: '#FFFFFF90', // label color
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#FFFFFF', // label color when focused
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#FFFFFF90', // default border
        },
        '&:hover fieldset': {
            borderColor: '#FFFFFF', // hover border
        },
        '&.Mui-focused fieldset': {
            borderColor: '#FFFFFF', // focused border
        },
    },
    '& .MuiSelect-select': {
        color: '#FFFFFF', // text color inside select
        fontSize: '16px',
    },
    '& .MuiSvgIcon-root': {
        color: '#FFFFFF', // dropdown arrow color
    },
}