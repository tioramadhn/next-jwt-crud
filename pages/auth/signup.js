import { Button, Grid, Stack, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box } from "@mui/system";
import useSWR from 'swr'

export default function Signup({ }) {
    const Router = useRouter();
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
            setStatus(res.errors)
            return setError(true);
        }
        setLoading(false)
        setStatus(res.message)
        setSuccess(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        fetcher(`${process.env.NEXT_PUBLIC_ORIGIN}/api/auth/signup`);
    }

    const handleResetStatus = () => {
        setLoading(false)
        setError(false)
        setSuccess(false)
    }

    return (
        <>
            <Head>
                <title>Signup</title>
            </Head>
            <Grid container justifyContent='center'>
                <Typography variant="h3" textAlign='center' gutterBottom>🍕Sign up</Typography>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Stack spacing={2} sx={{ width: 300 }}>
                        {success && <Alert severity="success">Berhasil daftar! Silahkan login</Alert>}
                        <Box >
                            <TextField sx={{ width: '100%' }} name="email" label="Email" type="text" onFocus={handleResetStatus} onChange={(e) => handleChange(e)} />
                            {error && <Typography variant="subtitle2" color="error">{status.email}</Typography>}
                        </Box>
                        <Box>
                            <TextField sx={{ width: '100%' }} name="password" label="Password" type="password" onFocus={handleResetStatus} onChange={(e) => handleChange(e)} />
                            {error && <Typography variant="subtitle2" color="error">{status.password}</Typography>}
                        </Box>
                        <Button disabled={loading} variant='contained' onClick={(e) => handleSubmit(e)}>Simpan</Button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}


export const getServerSideProps = async (ctx) => {
    return {
        props: {}
    }
}
