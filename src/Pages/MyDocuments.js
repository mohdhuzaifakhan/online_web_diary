import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar'
import { Box, Typography, ImageList, ImageListItem, Grid, IconButton, Snackbar, Button, Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle, TextField } from '@mui/material'
import { Delete, UploadFile } from '@mui/icons-material'

import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage'
import { storage } from '../firebase/initialization'
import img from '../public/pdf.png'

function MyDocuments() {
  const { uid } = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [snackBarFlag, setSnackBarFlag] = useState(false)
  const [snackBarMsg, setSnackBarMsg] = useState("");
  const [allDocsFile, setDocsFile] = useState([]);


  useEffect(() => {
    const docsDetails = new Array();
    const storageRef = ref(storage, `documents/${uid}`);
    listAll(storageRef).then((list) => {
      // console.log(list)
      list.items.forEach((item) => {
        const fileRef = ref(storage, item._location.path_)
        const fileName = fileRef.name;
        // console.log(fileName)
        getDownloadURL(fileRef).then((url) => {
          // console.log(url)
          docsDetails.push({ url, fileName })
        })
      })

    }).catch((err) => {
      console.log("Some problem while fetching images")
      console.log(err);
    })
    setDocsFile(docsDetails);
    // console.log(docsDetails)
  }, [])

  function UploadDocs() {
    const storageRef = ref(storage, `documents/${uid}/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log(snapshot)
      setSnackBarMsg("File successfully uploaded")
      setSnackBarFlag(true);

    }).catch((err) => {
      setSnackBarMsg("There is a problem when uploading documents")
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
            <div className='text-3xl font-serif'><h2>My All Documents</h2></div>
          </div>
          <div className='mx-5 my-1'>
            <div className='text-end'>
              <div className='mx-1 inline w-14 mx-1 my-1'>
                <Button variant='contained' size='small'>
                  <Delete />
                  <div className='hidden lg:inline'>Delete Document</div>
                </Button>
              </div>
              <div className='mx-1 inline'>
                <Button variant='contained' size="small" onClick={() => { handleClickOpen() }}>
                  <UploadFile />
                  <div className='hidden lg:inline'>Add Documents</div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Box>
        <Dialog open={open} onClose={() => { handleClose() }}>
          <DialogTitle>Select a file</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="document"
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
            <Button onClick={() => { UploadDocs() }}>Save</Button>
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
        <div className="grid grid-cols-1 mx-2 my-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2">
          {
            allDocsFile.map(({ url, fileName }) => {
              return (
                <div className='justify-center mx-1 my-1'>

                  <div className='justify-center flex'>
                    <img src={img} className='w-44 h-38' />
                  </div>
                  <div className='justify-center flex mx-1 my-1 font-serif'>
                    {fileName.slice(0,15)}...
                  </div>
                  <div className='justify-center flex'>
                    <Button variant="contained" size='small' href={url}>Download</Button>
                  </div>

                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default MyDocuments

