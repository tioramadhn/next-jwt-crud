import { Grid, Skeleton } from '@mui/material';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import BasicCard from '../../components/Card';
import { useGetStudentsQuery } from '../../redux/services/studentService';

export const getServerSideProps = async () => {
    // const { data, isError, isLoading } = useGetStudentsQuery('');
    const req = await fetch('http://localhost:3000/api/students')
    const res = await req.json()
    // console.log(res);
    return {
        props: { data: res.data }
    }
}

export default function Students({ data }) {
    // const [student, setStudent] = useState([]);


    // useEffect(() => {
    //     if (data) setStudent(data.data);
    // }, [data, student])


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
