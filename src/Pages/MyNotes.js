import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import { Box, Tooltip, Typography, Paper, ListItemButton, Menu, ListItemText, ListItemIcon, List, ListItem, Button, TextField, Stack } from '@mui/material';
import { Delete, Edit, EditNote, NoteAdd, SaveAs } from '@mui/icons-material';
import { db } from '../firebase/initialization';
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import ListIcon from '@mui/icons-material/List';
// import './MyNotes.css';  // Custom CSS file for additional styles

function MyNotes() {
  const [index, setIndex] = useState(-1);
  const titleLabel = "Heading of your note";
  const NoteLabel = "Write your note";
  const { email, uid } = JSON.parse(localStorage.getItem("user"));
  const [tl, setTL] = useState(titleLabel);
  const [ntl, setNTL] = useState(NoteLabel);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [readOnlyStatus, setReadOnlyStatus] = useState(false);
  const [flag, setFlag] = useState(false);
  const [userData, setUserData] = useState({
    files: []
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function newNote() {
    setTitle('');
    setText('');
    setTL(titleLabel);
    setNTL(NoteLabel);
    setReadOnlyStatus(false);
    setFlag(false);
    console.log("new Note");
  }

  async function deleteNote(index) {
    userData.files.splice(index, 1);
    setUserData({ ...userData });
    const UserDocRef = doc(db, "users", uid);
    await updateDoc(UserDocRef, {
      files: userData.files
    });
    console.log("Successfully deleted");
  }

  function handleNotes({ title, text }) {
    setTitle(title);
    setText(text);
    setTL('');
    setNTL('');
    setReadOnlyStatus(true);
    console.log(title, text);
  }

  function makeNoteEditable() {
    setReadOnlyStatus(false);
    setTL(titleLabel);
    setNTL(NoteLabel);
    setFlag(true);
  }

  async function updateNote() {
    userData.files.splice(index, 1);
    userData.files.push({ title, text });
    setUserData({ ...userData });
    const UserDocRef = doc(db, "users", uid);
    await updateDoc(UserDocRef, {
      files: userData.files
    });
    console.log("Update changes", index);
    setReadOnlyStatus(true);
    setNTL('');
    setTL('');
  }

  async function dataAvailability() {
    const userDocRef = doc(db, "users", uid);
    const userRef = await getDoc(userDocRef);
    if (userRef.exists()) {
      const data = userRef.data();
      console.log(data);
      setUserData(data);
    }
  }

  useEffect(() => {
    dataAvailability();
  }, []);

  async function handleSubmit() {
    const userDocRef = doc(db, "users", uid);
    if (userData.files.length !== 0) {
      await updateDoc(userDocRef, {
        files: [...userData.files, { title, text }]
      });
    } else {
      await setDoc(userDocRef, {
        email: email,
        name: "User",
        files: [{ title, text }]
      });
    }
    setReadOnlyStatus(true);
    setNTL('');
    setTL('');
    dataAvailability();
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto my-6">
        <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mx-auto my-3">
          <div className='mx-5 my-1'>
            <Typography variant="h4" className="font-serif">Write Notes</Typography>
          </div>
          <div className='mx-5 my-1'>
            <div className='lg:text-end text-center'>
              <div className='mx-1 my-1 lg:hidden inline'>
                <Button
                  variant='contained'
                  size='small'
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <Tooltip title="Delete" arrow>
                    <ListIcon />
                  </Tooltip>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  sx={{ marginTop: '5px' }}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <div className="">
                    <Stack direction="column">
                      <List>
                        {userData.files.map((item, index) => (
                          <ListItem disablePadding key={index}>
                            <ListItemButton onClick={() => {
                              handleNotes(item);
                              setIndex(index);
                              handleClose();
                            }}>
                              <ListItemText primary={item.title.slice(0, 10)} color='black' />
                              <ListItemIcon sx={{ justifyContent: 'end' }}>
                                <Delete onClick={() => { deleteNote(index) }} />
                              </ListItemIcon>
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Stack>
                  </div>
                </Menu>
              </div>
              <div className='mx-1 my-1 inline'>
                <Tooltip title="Add note" arrow>
                  <Button variant='contained' sx={{ marginTop: '2px' }} size="small" onClick={newNote}>
                    <NoteAdd />
                  </Button>
                </Tooltip>
              </div>
              <div className='mx-1 my-1 inline'>
                {!flag ?
                  <Tooltip title="Save" arrow>
                    <Button variant='contained' sx={{ marginTop: '2px' }} size='small' onClick={handleSubmit}>
                      <SaveAs />
                    </Button>
                  </Tooltip> :
                  <Tooltip title="Save" arrow>
                    <Button variant='contained' sx={{ marginTop: '2px' }} size='small' onClick={updateNote}>
                      <SaveAs />
                    </Button>
                  </Tooltip>
                }
              </div>
              <div className="mx-1 my-1 inline">
                <Tooltip title="Edit" arrow>
                  <Button variant='contained' sx={{ marginTop: '2px' }} size='small' onClick={makeNoteEditable}>
                    <Edit />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-3 mx-2">
          <div className="col-span-1 lg:inline hidden">
            <Stack direction="column">
              <Box>
                <Paper sx={{ padding: '12px', margin: '7px' }}>
                  <Typography variant='h5' sx={{ textAlign: 'center', fontFamily: 'serif' }}>
                    All Notes
                  </Typography>
                </Paper>
              </Box>
              <List>
                <Paper sx={{ padding: '12px', margin: '7px' }}>
                  {userData.files.map((item, index) => (
                    <ListItem disablePadding key={index}>
                      <ListItemButton onClick={() => {
                        handleNotes(item);
                        setIndex(index);
                      }}>
                        <ListItemIcon>
                          <EditNote />
                        </ListItemIcon>
                        <ListItemText primary={item.title} color='black' />
                        <ListItemIcon>
                          <Tooltip title="Delete" arrow>
                            <Delete onClick={() => { deleteNote(index) }} />
                          </Tooltip>
                        </ListItemIcon>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </Paper>
              </List>
            </Stack>
          </div>
          <div className="lg:col-span-2 col-span-3">
            <Stack direction='column'>
              <Box>
                <Paper sx={{ padding: '12px', margin: '7px', width: '100%' }}>
                  <TextField
                    required
                    label={tl}
                    variant="standard"
                    sx={{ width: '100%' }}
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      disableUnderline: true,
                      readOnly: readOnlyStatus
                    }}
                  />
                </Paper>
              </Box>
              <Box>
                <Paper sx={{ padding: '12px', margin: '7px' }}>
                  <TextField
                    required
                    label={ntl}
                    variant="standard"
                    multiline
                    sx={{ width: '100%' }}
                    rows={15}
                    value={text}
                    onChange={(e) => { setText(e.target.value) }}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      disableUnderline: true,
                      readOnly: readOnlyStatus
                    }}
                  />
                </Paper>
              </Box>
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyNotes;
