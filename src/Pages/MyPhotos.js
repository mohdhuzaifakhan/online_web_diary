import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar'
import { Box, Snackbar, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { Co2Sharp, Delete } from '@mui/icons-material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage'
import { storage } from '../firebase/initialization'

function MyPhotos() {
  const { uid } = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [snackBarFlag, setSnackBarFlag] = useState(false)
  const [snackBarMsg, setSnackBarMsg] = useState("");
  const [allPhotos, setPhotos] = useState([])

  useEffect(() => {
    const photos = new Array();
    const storageRef = ref(storage, `images/${uid}`);
    listAll(storageRef).then((list) => {

      list.items.forEach((item) => {
        getDownloadURL(ref(storage, item._location.path_)).then((url) => {
          photos.push(url)
        })
      })

    }).catch((err) => {
      console.log("Some problem while fetching images")
      console.log(err);
    })
    setPhotos(photos);
  }, [])


  function UploadFiles() {
    const storageRef = ref(storage, `images/${uid}/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      setSnackBarMsg("Photo successfully uploaded")
      setSnackBarFlag(true);

    }).catch((err) => {
      setSnackBarMsg("There is a problem when uploading photo")
      setSnackBarFlag(true);
    })
    handleClose();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto my-6">
        <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mx-auto my-3">
          <div className='mx-5 my-1'>
            <div className='text-3xl font-serif'><h2>My All Photos</h2></div>
          </div>
          <div className='mx-5 my-1'>
            <div className='text-end'>
              <div className='mx-1 inline w-14 mx-1 my-1'>
                <Button variant='contained' size='small'>
                  <Delete />
                  <div className='hidden lg:inline'> Delete Photos</div>
                </Button>
              </div>
              <div className='mx-1 inline'>
                <Button variant='contained' size="small" onClick={() => { handleClickOpen() }}>
                  <AddPhotoAlternateIcon />
                  <div className='hidden lg:inline'>Add Photos</div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Box>
        <Dialog open={open} onClose={() => { handleClose() }}>
          <DialogTitle>Select a Photo</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Photo"
              type="file"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setFile(e.target.files[0])
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { handleClose() }}>Cancel</Button>
            <Button onClick={() => { UploadFiles() }}>Save</Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          color='success'
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBarFlag}
          autoHideDuration={2000}
          onClose={() => {
            setSnackBarFlag(false)
          }}
          message={snackBarMsg}

        />
      </Box>

      <div className="container mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 ">

          {
            allPhotos.map((url) => {
              console.log(url)
              return (
                <div className="mx-1 my-1">
                  <img src={url} className='w-48 h-32 mx-auto' height='180px' width='100%' style={{ borderRadius: '10px' }} />
                </div>
              )
            })
          }

        </div>
      </div>

    </>
  )
}

export default MyPhotos


