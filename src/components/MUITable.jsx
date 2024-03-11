import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";
import '../styles/CommonWallet.css'
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { DateRangePicker, Stack } from 'rsuite';


function MUITable() {

    const [searchBox, setSearchBox] = useState('');
    const [TransactionType, setTransactionType] = useState(0);
    const [selectedDateRange, setSelectedDateRange] = useState(null);

    const columns = [
        {
            name: 'DATE',
            label: 'Date',
        },
        {
            name: 'AMOUNT',
            label: 'Amount',
        },
        {
            name: 'STATUS',
            label: 'Status',
            options: {
                customBodyRender: (value) => (
                    <span style={{ color: getStatusColor(value) }}>{value}</span>
                ),
            },
        },
        {
            name: 'TRANSACTION ID',
            label: 'Transaction ID',
        },
    ];

    const data = [
        ['12 Dec 2023', '+₹8414.00', 'Success', 'ID-1234567890'],
        ['12 May 2023', '+₹8414.00', 'Failed', 'ID-1234567890'],
        ['12 Dec 2023', '-₹8414.00', 'Success', 'ID-1234567890'],
        ['12 Dec 2023', '+₹8414.00', 'Success', 'ID-1234567890'],
        ['12 Dec 2023', '+₹8414.00', 'Success', 'ID-1234567890'],
        ['12 Dec 2023', '-₹8414.00', 'Pending', 'ID-1234567890'],
        ['12 Dec 2023', '+₹8414.00', 'Success', 'ID-1234567890'],
        ['12 Dec 2022', '+₹8414.00', 'Success', 'ID-1234567890'],
        ['12 Dec 2024', '-₹8414.00', 'Failed', 'ID-1234567890'],
        ['12 Dec 2023', '-₹8414.00', 'Success', 'ID-1234567890'],
        ['12 Dec 2023', '+₹8414.00', 'Success', 'ID-1234567890'],
        ['12 Dec 2023', '+₹8414.00', 'Pending', 'ID-1234567890'],
        ['12 Dec 2023', '+₹8414.00', 'Success', 'ID-1234567890'],
        ['12 Dec 2023', '+₹8414.00', 'Success', 'ID-1234567890'],
        ['12 Dec 2023', '+₹8414.00', 'Success', 'ID-1234567890'],
    ];

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'success':
                return 'green';
            case 'failed':
                return 'red';
            case 'pending':
                return 'orange';
            default:
                return 'black';
        }
    };

    // To select transaction type
    const TransactionTypeChange = (e) => {
        setTransactionType(e.target.value);
    }

    const getStatusLabel = (value) => {
        switch (value) {
            case '1':
                return 'Success';
            case '2':
                return 'Failed';
            case '3':
                return 'Pending';
            default:
                return '';
        }
    };

    const options = {
        filterType: 'multiselect',
        responsive: 'standard',
        filterList: TransactionType === 0 ? [] : [[getStatusLabel(TransactionType)]],
        searchText: searchBox, // Pass the search term to the DataTable
        onSearchChange: (searchText) => setSearchBox(searchText), // Handle search term change
    };

    // To select date range
    const handleDateRangeChange = (date) => {
        setSelectedDateRange(date);
    };

    const dateIndex = 0;
    const statusIndex = 2;

    // Filter data based on the selected date range and status
    const filteredData = data.filter(row => {
        const rowDate = new Date(row[dateIndex]);
        const isDateInRange = !selectedDateRange || (rowDate >= selectedDateRange[0] && rowDate <= selectedDateRange[1]);
        const isStatusMatch = TransactionType === 0 || getStatusLabel(TransactionType) === '' || row[statusIndex].toLowerCase() === getStatusLabel(TransactionType).toLowerCase();
        return isDateInRange && isStatusMatch;
    });


    // Format dates to 'dd MMM yyyy' (e.g., '12 Dec 2023')
    const formattedData = filteredData.map(row => {
        const rowDate = new Date(row[dateIndex]);
        const formattedDate = rowDate.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
        return [...row.slice(0, dateIndex), formattedDate, ...row.slice(dateIndex + 1)];
    });


    return (
        <Box sx={{ width: '100%' }}>

            <Grid sx={{ display: 'flex', flexDirection: 'row', margin: '15px auto' }}>
                <Grid container sx={{ display: 'flex', flexDirection: 'row', position: 'relative', width: '50%' }}>
                    <span class="material-symbols-outlined search_MUITable" >search</span>
                    <input type='text' value={searchBox} onChange={(e) => setSearchBox(e.target.value)} placeholder='Search' className='searchBox_MUITable' />
                    <span class="material-symbols-outlined filter_MUITable">filter_alt</span>
                </Grid>
                <Grid container sx={{ width: '20%' }} >
                    <select className='MUITable_Select' value={TransactionType} onChange={TransactionTypeChange} >
                        <option value={0}>All Transactions</option>
                        <option value={1}>Success</option>
                        <option value={2}>Failed</option>
                        <option value={3}>Pending</option>
                    </select>
                </Grid>
                <Grid container sx={{ width: '30%' }} >
                    <Stack spacing={10} direction="column" alignItems="flex-start">
                        <DateRangePicker format="dd/MM/yyyy" character=" –> "
                            onChange={handleDateRangeChange}
                            value={selectedDateRange}
                        />
                    </Stack>
                </Grid>
            </Grid>

            <MUIDataTable
                // data={filteredData}
                data={formattedData}
                columns={columns}
                options={options}
            />
        </Box>
    )
}

export default MUITable