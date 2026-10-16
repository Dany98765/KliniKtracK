"use client"

import "./styles.css"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { slotProps } from "./dateFieldProps";
import dayjs from "dayjs";

export default function EventStartAndEndDatesFields({ state, setState }) {
    return (
        <div className="startAndEndDatesFieldsContainer">
            <div className="startDateFieldContainer">
                <p className="startDateTitle">Start Date <span className="requiredAsteriks">*</span></p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Select Start date"
                        className="startDateField"
                        slotProps={slotProps}
                        value={state.startDate ? dayjs(state.startDate) : dayjs()}
                        onChange={(e) => {
                            setState((prev) => ({
                                ...prev,
                                startDate: e.$d
                            }))
                        }}
                    />
                </LocalizationProvider>
            </div>
            <div className="endDateFieldContainer">
                <p className="endDateTitle">End Date <span className="requiredAsteriks">*</span></p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Select Start date"
                        className="endDateField"
                        slotProps={slotProps}
                        value={state.endDate ? dayjs(state.endDate) : dayjs()}
                        onChange={(e) => {
                            setState((prev) => ({
                                ...prev,
                                endDate: e.$d
                            }))
                        }}
                    />
                </LocalizationProvider>
            </div>
        </div >
    )
}