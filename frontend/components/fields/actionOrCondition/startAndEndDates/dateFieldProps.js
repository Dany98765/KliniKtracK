export let slotProps = {
    textField: {
        sx: {
            color: "white",
            // Label color (default state)
            '& .MuiInputLabel-root': { color: '#FFFFFF90' },
            // Label color (focused state)
            '& .MuiInputLabel-root.Mui-focused': { color: '#FFFFFF90' },
            // Input text color
            '& .MuiInputBase-input': { color: '#FFFFFF' },
            // Border adjustments
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: '#DDDDDD',
                    borderWidth: '2px',
                },
                '&:hover fieldset': {
                    borderColor: '#DDDDDD',
                    borderWidth: '2px',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#DDDDDD',
                    borderWidth: '2px',
                },
            },
            // Calendar icon color
            '& .MuiSvgIcon-root': { color: '#FFFFFF90' },
            '& input': {
                color: '#FFFFFF !important',
                WebkitTextFillColor: '#FFFFFF !important', // Prevents browser/OS overrides
            },
        },
    },
    // TARGETS EACH INDIVIDUAL DAY ROOT ELEMENT
    day: {
        sx: {
            // Default unselected days text color -> WHITE
            color: '#A411D9',

            // Selected day background & text color -> BLACK text on LIGHT GREY background
            '&.Mui-selected': {
                backgroundColor: '#23BAE7 !important',
                color: '#ffffff !important',
            },
            // Hover states
            '&:hover': {
                backgroundColor: '#ffffff',
            },
        }
    },
    // OPTIONAL: Targets the header text (Monday, Tuesday, etc. and Month titles)
    desktopPaper: {
        sx: {
            // Changes calendar background color to match dark mode if needed
            backgroundColor: '#121212', 
            '& .MuiPickersCalendarHeader-label': { color: '#FFFFFF' },
            '& .MuiPickersCalendarHeader-switchViewIcon': { color: '#FFFFFF' },
            '& .MuiDayCalendar-weekDayLabel': { color: '#FFFFFF90' },
        }
    }
};