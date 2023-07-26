import React, { useEffect, useState } from 'react'
import { auth } from './firebase/initialization'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { FormControl, Grid, TextField, Button, Typography, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'


function Login() {
    const navigate = useNavigate()
    const [isloading, setLoading] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [helperTextForEmail, setHelperTextForEmail] = useState("");
    const [helperTextPassword, setHelperTextPassword] = useState("");
    const userInfo = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        if (userInfo) {
            navigate('/notes')
        }
    }, [userInfo])

    function login() {


        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const { user } = userCredential
                setEmail("");
                setPassword("")
                localStorage.setItem("user", JSON.stringify({ email: user.email, uid: user.uid }))
                navigate('/notes')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorCode)
                // console.log(errorMessage)
                setHelperTextForEmail("Email or password is wrong")
            });
        setLoading(false);

    }


    function signUp() {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                console.log(user.user.email)
                console.log(user.user.id)
                setEmail("");
                setPassword("")
                // setHelperTextForEmail("");
                // setHelperTextPassword("")
                localStorage.setItem("user", JSON.stringify({ email: user.user.email, uid: user.user.uid }))
                navigate('/notes')
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === "auth/email-already-in-use") {
                    setHelperTextForEmail("This Email is already exist")
                } else if (errorCode === "auth/weak-password") {
                    setHelperTextPassword("Weak password, password should be atleast 6 characters")
                }
            });
        setLoading(false)
    }


    return (

        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ height: '100vh', backgroundcolor: 'snow' }}
        >
            <Grid>
                <div className="container lg:text-4xl md:text-3xl text-2xl sm:text-2xl my-2 mx-auto text-center p-2 font-serif">
                    <h2>
                        Login to online web Diary
                    </h2>
                </div>
            </Grid>
            <Grid sx={{ boxShadow: '5px', backgroundcolor: 'white' }}>
                <FormControl component="form" autoComplete='off'>
                    <TextField requirede id="email" helperText={helperTextForEmail} type='email' label="Email" variant="outlined" sx={{ margin: '5px' }}
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <TextField required id="password" type='password' helperText={helperTextPassword} label="Password" variant="outlined" sx={{ margin: '5px' }}
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <Button variant="outlined" sx={{ margin: '5px' }} onClick={() => { login() }}>{!isloading ? "Sign In" : <CircularProgress size="26px" />}</Button>
                    <Button variant="outlined" sx={{ margin: '5px' }} onClick={() => { signUp() }}>{!isloading ? "Sign Up" : <CircularProgress />}</Button>
                </FormControl>
            </Grid>
        </Grid>

    )
}

export default Login
