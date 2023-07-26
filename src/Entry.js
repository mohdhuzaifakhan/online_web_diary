import React, { useEffect } from 'react'
import { Box, Typography, Grid, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
function Entry() {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()

  useEffect(() => {

    if (userInfo) {
      navigate('/notes')
    }

  }, [])
  return (
    <>

      <div className="bg-rose-700 flex h-screen w-full border justify-center items-center">
        <div className='-mt-28'>
          <div className="mx-4 my-2 text-center">
            <h2 className="fs-1 text-2xl lg:text-4xl md:text-3xl sm:text-2xl text-green text-green-500 font-serif">Online Web Diary</h2>
          </div>
          <div className="font-serif text-base text-justify lg:text-lg text-white mx-4 my-2">
            <p> Hey , This is online web diary application , here you can save your documents as well as images.
              You can make notes and upload on Cloud.</p>
          </div>
          <div className='lg:text-end text-center justify-center'>
            <Box sx={{color: "white", direction: 'row', marginX: '20px'}}>
              <Button variant="contained" color="primary" href='/login'>Login/register</Button>
            </Box>
          </div>
        </div>
      </div>

    </>
  )
}

export default Entry
