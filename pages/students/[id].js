import { Button, Grid, Stack, TextField, Typography, Alert, Snackbar } from "@mui/material";
import { useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'


export const getServerSideProps = async (ctx) => {
    const { query } = ctx;
    const req = await fetch(`${process.env.NEXT_PUBLIC_ORIGIN}/api/students/${query.id}`)
    const res = await req.json();
    // console.log(res)
    return {
        props: { student: res.data || '' }
    }
}

export default function EditStudent({ student }) {
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

    const handleSave = async (e) => {
        e.preventDefault();
        setStatus({ ...status, isLoading: true })
        const req = await fetch(`${process.env.NEXT_PUBLIC_ORIGIN}/api/students/${student._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(field)
        })
        console.log(req)
        if (!req.ok) return setStatus({ ...status, isError: true })
        const res = await req.json();

        setStatus({ ...status, isLoading: false })
        setStatus({ ...status, isSuccess: true })

        setTimeout(() => {
            setStatus({
                isError: false,
                isLoading: false,
                isSuccess: false
            })
            Router.push('/students')
        }, 1000)
    }
    // console.log(student)
    return (
        <>
            <Head>
                <title>Edit | {student.nama}</title>
            </Head>
            {status.isSuccess && <Snackbar open={true}><Alert severity="success" color='primary' elevation={3}>Berhasil di ubah</Alert></Snackbar>}
            <Grid container>
                <Grid item xs={12}>
                    <Stack spacing={2} sx={{ width: 300 }}>

                        {status.isError && <Alert severity="error">Gagal di ubah</Alert>}

                        <TextField defaultValue={student.nama} name="nama" label="Nama" type="text" onChange={(e) => handleChange(e)} />
                        <TextField defaultValue={student.nim} name="nim" label="Jurusan" type="text" onChange={(e) => handleChange(e)} />
                        <TextField defaultValue={student.jurusan} name="jurusan" label="Jurusan" type="text" onChange={(e) => handleChange(e)} />
                        <Button disabled={status.isLoading} variant='contained' onClick={(e) => handleSave(e)}>Simpan</Button>
                    </Stack>
                </Grid>
            </Grid >
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    const token = ctx.req.cookies.jwt;
    if (!token) {
        return {
            redirect: {
                destination: `/`,
                permanent: false,
            },
        }
    }

    return {
        props: {}
    }
}
