import { AppBar, Button, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"
import Link from 'next/link'
import { useContext } from "react"
import { AuthContext } from "../../stores/authContext"


export default function Header({ }) {
    const value = useContext(AuthContext)

    return (
        <Box sx={{ flexGrow: 1, mb: 1 }}>
            <AppBar position="sticky" color="primary" elevation={0}>
                <Toolbar>
                    <Link href="/" passHref >
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer', display: 'inline-block' }}>
                            {value}
                        </Typography>
                    </Link>
                    <Link href="/auth/login" passHref><Button sx={{ mr: 1 }} color="inherit" >Login</Button></Link>
                    <Link href="/auth/signup" passHref><Button color="inherit" variant="outlined">Sign up</Button></Link>
                </Toolbar>
            </AppBar>
        </Box>
    )
}