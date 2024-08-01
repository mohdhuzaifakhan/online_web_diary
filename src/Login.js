import React, { useEffect, useState } from 'react';
import { auth } from './firebase/initialization';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FormControl, Grid, TextField, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [LoginisLoading, setLoginisLoading] = useState(false);
    const [SignUpisLoading, setSignUpisLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [helperTextForEmail, setHelperTextForEmail] = useState("");
    const [helperTextPassword, setHelperTextPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [signupError, setSignupError] = useState("");
    const userInfo = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (userInfo) {
            navigate('/notes');
        }
    }, [userInfo, navigate]);

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const login = () => {
        if (!email || !password) {
            setHelperTextForEmail("Email and password are required");
            setHelperTextPassword("Email and password are required");
            return;
        }

        if (!validateEmail(email)) {
            setHelperTextForEmail("Please enter a valid email address");
            return;
        }

        setLoginisLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const { user } = userCredential;
                setEmail("");
                setPassword("");
                localStorage.setItem("user", JSON.stringify({ email: user.email, uid: user.uid }));
                navigate('/notes');
            })
            .catch((error) => {
                setLoginError("Email or password is incorrect");
                setLoginisLoading(false);
            });
    };

    const signUp = () => {
        if (!email || !password) {
            setHelperTextForEmail("Email and password are required");
            setHelperTextPassword("Email and password are required");
            return;
        }

        if (!validateEmail(email)) {
            setHelperTextForEmail("Please enter a valid email address");
            return;
        }

        setSignUpisLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const { user } = userCredential;
                setEmail("");
                setPassword("");
                localStorage.setItem("user", JSON.stringify({ email: user.email, uid: user.uid }));
                navigate('/notes');
            })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    setSignupError("This email is already in use");
                } else if (error.code === "auth/weak-password") {
                    setSignupError("Weak password, password should be at least 6 characters");
                }
                setSignUpisLoading(false);
            });
    };

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ height: '100vh', backgroundColor: 'snow' }}
        >
            <Grid>
                <div className="container lg:text-4xl md:text-3xl text-2xl sm:text-2xl my-2 mx-auto text-center p-2 font-serif">
                    <h2>Login to Online Web Diary</h2>
                </div>
            </Grid>
            <Grid sx={{ boxShadow: '5px', backgroundColor: 'white', width: '500px', textAlign: 'center' }}>
                <FormControl component="form" autoComplete="off" sx={{ width: '75%' }}>
                    <TextField
                        required
                        id="email"
                        helperText={helperTextForEmail || loginError || signupError}
                        type="email"
                        label="Email"
                        variant="outlined"
                        sx={{ margin: '5px' }}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setHelperTextForEmail("");
                            setLoginError("");
                            setSignupError("");
                        }}
                    />
                    <TextField
                        required
                        id="password"
                        type="password"
                        helperText={helperTextPassword}
                        label="Password"
                        variant="outlined"
                        sx={{ margin: '5px' }}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setHelperTextPassword("");
                        }}
                    />
                    <Button
                        variant="outlined"
                        sx={{ margin: '5px' }}
                        onClick={login}
                        disabled={LoginisLoading || !email || !password}
                    >
                        {!LoginisLoading ? "Sign In" : <CircularProgress size="26px" />}
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ margin: '5px' }}
                        onClick={signUp}
                        disabled={SignUpisLoading || !email || !password}
                    >
                        {!SignUpisLoading ? "Sign Up" : <CircularProgress size="26px" />}
                    </Button>
                </FormControl>
            </Grid>
        </Grid>
    );
}

export default Login;
