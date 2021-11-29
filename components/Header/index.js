import { AppBar, Button, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"
import Link from 'next/link'
import { useState, useEffect } from 'react'


export default function Header({ }) {
    const [token, setToken] = useState('')

    useEffect(() => {
        const handleToken = async () => {
            const req = await fetch('http://localhost:3000/api/tokens')
            const res = await req.json();
            setToken(res)
        }
        handleToken();
    }, [])

    const isLogin = token.tokens
    // console.log(isLogin)
    // 

    return (
        <Box sx={{ flexGrow: 1, mb: 1 }}>
            <AppBar position="sticky" color="primary" elevation={0}>
                <Toolbar>
                    <Link href="/" passHref >
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
                            Student Portal
                        </Typography>
                    </Link>
                    {isLogin ?
                        (<Button color="inherit" variant="outlined"><Typography>
                            Halo, User
                        </Typography></Button>)
                        : (<>
                            <Link href="/auth/login" passHref><Button sx={{ mr: 1 }} color="inherit" >Login</Button></Link>
                            <Link href="/auth/signup" passHref><Button color="inherit" variant="outlined">Sign up</Button></Link>
                        </>)}
                </Toolbar>
            </AppBar>
        </Box>
    )
}