import React, { useState } from 'react'
import '../styles/CommonWallet.css'
import { Box, Button, Grid, Typography } from '@mui/material'
import MUITable from './MUITable'


function CommonWallet() {

    document.title = 'Wallet';

    const [hideAmount, setHideAmount] = useState(false);

    const showWalletBalance = () => {
        setHideAmount(!hideAmount);
    }

    return (
        <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                flexDirection: 'column',
                width: '100%',
            }}>
            <Grid sx={{marginTop: '50px', marginBottom: '40px'}}>
                <Grid container sx={{ position: 'relative' }}>
                    <input value={'₹8414.00'} align="center" style={{ fontWeight: '700', fontSize: '25px', textAlign: 'center', width: '100%', outline: 'none', border: 'none' }} readOnly type={hideAmount ? 'text' : 'password'} />
                    <Typography onClick={showWalletBalance} variant="h6" align="center" sx={{ fontWeight: '200', position: 'absolute', color: '#B27EE3', fontSize: '14px', textDecoration: 'underline', top: '10px', height: '100%', right: '0px', cursor: 'pointer' }}>{hideAmount ? 'Hide Balance' : 'Show Balance'}</Typography>
                </Grid>
                <Grid container >
                    <Typography variant="h6" align="center" sx={{ fontWeight: '500', fontSize: '16px', textAlign: 'center', width: '100%' }}>Current Balance</Typography>
                </Grid>
                <Grid container sx={{ marginTop: '20px' }}>
                    <Button variant="contained" sx={{ backgroundColor: '#B27EE3', color: '#fff', width: '100%', borderRadius: '10px', textTransform: 'none', padding: '5px 50px', '&:hover': { backgroundColor: '#B27EE3' } }}>Withdraw Balance</Button>
                </Grid>
            </Grid>

            <Grid sx={{ width: '90%' }}>
                <Typography sx={{ fontWeight: '600', fontSize: '18px' }}>Transaction History</Typography>
                <MUITable />
            </Grid>
        </Box>
    )
}

export default CommonWallet