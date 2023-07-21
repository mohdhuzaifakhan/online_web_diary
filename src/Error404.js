import React from 'react'
import { Grid, Typography } from '@mui/material'
export default function Error404() {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ height: '100vh' }}
        >

            <Grid>
                <Typography variant='subtitle1' align='justify' sx={{ fontSize: '24px', fontFamily: 'serif' }}>
                    This Page is not avalilable
                </Typography>
            </Grid>

        </Grid>
    )
}
