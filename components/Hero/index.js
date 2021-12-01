import { ArrowForwardIosRounded } from '@mui/icons-material';
import TableViewIcon from '@mui/icons-material/TableView';
import { Button, Grid, Stack, Typography } from "@mui/material";
import Link from 'next/link';

export default function Hero() {
    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6} >
                    <Stack spacing={1} pt={{ xs: 2, md: 10 }}>
                        <TableViewIcon fontSize='large' color='primary' />
                        <Typography variant='h1' sx={{ fontWeight: 800 }}>
                            Data Siswa
                        </Typography>
                        <Typography variant='subtitle1'>
                            Sistem informasi yang terintegarasi antara Guru dan Siswa
                        </Typography>
                        <Link href='/students' passHref>
                            <Button
                                sx={{ width: `${8 * 12}px` }}
                                variant='contained'
                                endIcon={<ArrowForwardIosRounded fontSize='small' />}
                            >
                                View
                            </Button>
                        </Link>
                    </Stack>
                </Grid>
            </Grid>
        </div >
    )
}
