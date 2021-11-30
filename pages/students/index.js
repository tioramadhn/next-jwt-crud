import { Grid, Skeleton } from '@mui/material';
import Head from 'next/head';
import BasicCard from '../../components/Card';

export const getServerSideProps = async (ctx) => {
    const token = ctx.req.cookies.jwt;
    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    const req = await fetch(`${process.env.NEXT_PUBLIC_ORIGIN}/api/students`)
    const res = await req.json()
    return {
        props: { data: res.data }
    }
}

export default function Students({ data }) {

    return (
        <>
            <Head>
                <title>Students</title>
            </Head>
            <Grid container spacing={1}>
                {data.map((item, idx) => (
                    <BasicCard key={idx} nama={item.nama} nim={item.nim} jurusan={item.jurusan} id={item._id} />
                ))
                }
            </Grid>
        </>
    )
}

