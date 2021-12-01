import { Grid } from '@mui/material';
import Head from 'next/head';
import BasicCard from '../../components/Card';


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


export const getServerSideProps = async (ctx) => {
    const { cookie } = ctx.req.headers
    const response = await fetch(`${process.env.NEXT_PUBLIC_ORIGIN}/api/students`, {
        headers: {
            cookie
        }
    })
    const { data } = await response.json()
    if (!data) {
        return {
            redirect: {
                permanent: false,
                destination: "/auth/login"
            }
        }
    }
    return {
        props: { data: data }
    }
}
