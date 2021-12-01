import { Button, Grid, Stack, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box } from "@mui/system";
import { unauthPage } from '../../middleware/authMiddleware'

export default function Login({ }) {
    const router = useRouter();
    const [field, setField] = useState({})
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [status, setStatus] = useState('')


    const handleChange = (e) => {
        setField({
            ...field,
            [e.target.name]: e.target.value
        })
    }
    const fetcher = async (e) => {
        setLoading(true)
        const req = await fetch(e, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(field)
        })
        const res = await req.json();
        if (!res.success) {
            setLoading(false)
            setStatus(res.message)
            return setError(true);
        }
        setLoading(false)
        setStatus(res.message)
        setSuccess(true)
        Router.push('/students')

    }

    const handleSubmit = async (e) => {
        setLoading(false)
        setError(false)
        setSuccess(false)
        e.preventDefault()
        fetcher(`${process.env.NEXT_PUBLIC_ORIGIN}/api/auth/login`);
    }



    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <Grid container justifyContent='center'>
                <Typography variant="h3" textAlign='center' gutterBottom>🍔Login</Typography>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Stack spacing={2} sx={{ width: 300 }}>
                        {success && <Alert severity="success">Berhasil login</Alert>}
                        {error && <Alert severity="error">{status}</Alert>}
                        <Box >
                            <TextField sx={{ width: '100%' }} name="email" label="Email" type="text" onChange={(e) => handleChange(e)} />
                        </Box>
                        <Box>
                            <TextField sx={{ width: '100%' }} name="password" label="Password" type="password" onChange={(e) => handleChange(e)} />
                        </Box>
                        <Button disabled={loading} variant='contained' onClick={(e) => handleSubmit(e)}>Simpan</Button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}


export const getServerSideProps = async (ctx) => {
    await unauthPage(ctx)

    return {
        props: {}
    }
}
