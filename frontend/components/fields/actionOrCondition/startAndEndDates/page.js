"use client"

import "./styles.css"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function EventStartAndEndDatesFields() {
    return (
        <div className="startAndEndDatesFieldsContainer">
            <div className="startDateFieldContainer">
                <p className="startDateTitle">Start Date <span className="requiredAsteriks">*</span></p>
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}>
                    <DatePicker label="Select Start date"
                        slotProps={{
                            textField: {
                                sx: {
                                    // Label color (default state)
                                    '& .MuiInputLabel-root': { color: '#FFFFFF90' },
                                    // Label color (focused state)
                                    '& .MuiInputLabel-root.Mui-focused': { color: '#FFFFFF90' },
                                    // Input text color
                                    '& .MuiInputBase-input': { color: '#FFFFFF90' },
                                    // Border adjustments
                                    '& .MuiOutlinedInput-root': {
                                        // Default state: 1px width
                                        '& fieldset': {
                                            borderColor: '#FFFFFF90',
                                            borderWidth: '1px'
                                        },
                                        // Hover state: Change color and make it thicker
                                        '&:hover fieldset': {
                                            borderColor: '#FFFFFF', // Optional: Made it solid white on hover for contrast
                                            borderWidth: '2px'
                                        },
                                        // Focused state: Keep it thick or change color when active
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#FFFFFF90',
                                            borderWidth: '2px'
                                        },
                                    },
                                    // Calendar icon color
                                    '& .MuiSvgIcon-root': { color: '#FFFFFF90' },
                                },
                            },
                        }}
                    />
                </LocalizationProvider>
            </div>
            <div className="endDateFieldContainer">
                <p className="endDateTitle">End Date <span className="requiredAsteriks">*</span></p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Select End date" />
                </LocalizationProvider>
            </div>
        </div>
    )
}