import React, { useEffect } from 'react'
import { Box, Typography, Grid, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
function Entry() {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()

  useEffect(()=>{

    if(userInfo){
      navigate('/notes')
    }
    
  },[])
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh', backgroundColor: '#660033', padding: '22px', fontFamily: 'serif' }}
    >

      <Grid sx={{ marginTop: '-100px', marginX: '70px' }}>
        <Box>
          <Typography variant='h3' sx={{ color: '#006633' }}>
            Online Web Diary
          </Typography>
        </Box>
        <Box sx={{ margin: '10px', justifyContent: 'center' }}>
          <Typography variant='subtitle1' color="white" align='justify' sx={{ fontSize: '24px', fontFamily: 'serif' }}>
            Hey , This is online web diary application , here you can save your documents as well as images.
            You can make notes and upload on Cloud.
          </Typography>
        </Box>
        <Box sx={{ textAlign:'end', color:"white", direction: 'row'}}>
          <Button variant="outlined" color="primary" href='/login'>Login/register</Button>
        </Box>
      </Grid>

    </Grid>
  )
}

export default Entry
