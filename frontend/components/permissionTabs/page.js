"use client"

import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';

export default function PermissionTabs({ filterLabels }) {
    const [permissionType, setPermissionType] = useState(0);
    const router = useRouter()

    let mappedNumToSearchParamValue = {
        0: 'all',
        1: 'pending',
        2: 'granted',
        3: 'aborted'
    }

    function togglePemrissionTypeChange(_, newValue) {
        setPermissionType(newValue);
        console.log(newValue)
    };

    useEffect(() => {
        router.push(`?permissionType=${mappedNumToSearchParamValue[permissionType]}`)
    }, [permissionType])
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
                value={permissionType}
                onChange={togglePemrissionTypeChange}
                textColor="inherit"
                sx={{
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#A411D9'
                    },
                }}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
            >
                {filterLabels.map((filterLabel, id) => (
                    <Tab key={id} label={filterLabel} />
                ))}
            </Tabs>
        </Box>
    );
}
