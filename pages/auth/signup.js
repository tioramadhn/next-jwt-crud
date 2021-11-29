import { Button, Grid, Stack, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'

export default function Signup({ }) {
    const [field, setField] = useState({})
    const [status, setStatus] = useState({
        isError: false,
        isLoading: false,
        isSuccess: false
    })


    const handleChange = (e) => {
        setField({
            ...field,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        setStatus({ ...status, isLoading: true })

        const req = await fetch(`${process.env.NEXT_PUBLIC_ORIGIN}/api/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(field)
        });

        if (!req.ok) return setStatus({ ...status, isError: true })

        const res = await req.json();
        setStatus({ ...status, isLoading: false })
        setStatus({ ...status, isSuccess: true })

        if (status.isSuccess) Router.push('${process.env.NEXT_PUBLIC_ORIGIN}');
        // console.log(res)


        setTimeout(() => {
            setStatus({
                isError: false,
                isLoading: false,
                isSuccess: false
            })
        }, 5000)
    }


    return (
        <>
            <Head>
                <title>Signup</title>
            </Head>
            {status.isSuccess && <Snackbar open={true}><Alert severity="success" elevation={3}>Berhasil Login</Alert></Snackbar>}
            <Grid container>
                <Grid item xs={12}>
                    <Stack spacing={2} sx={{ width: 300 }}>
                        {status.isError && <Alert severity="error">Gagal Login</Alert>}
                        <TextField name="email" label="Email" type="text" onChange={(e) => handleChange(e)} />
                        <TextField name="password" label="Password" type="password" onChange={(e) => handleChange(e)} />
                        <Button variant='contained' onClick={(e) => handleSubmit(e)}>Simpan</Button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}


export const getServerSideProps = async (ctx) => {
    const token = ctx.req.cookies.jwt;
    if (token) {
        return {
            redirect: {
                destination: `${process.env.NEXT_PUBLIC_ORIGIN}`,
                permanent: false,
            },
        }
    }

    return {
        props: { isLogin: token ? true : false }
    }
}
