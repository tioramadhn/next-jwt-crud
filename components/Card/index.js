import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Skeleton } from '@mui/material';
import { useRouter } from 'next/router'


export default function BasicCard({ nama, nim, jurusan, isLoading, id }) {
    const router = useRouter();

    const handleDetail = (e) => {
        e.preventDefault();
        router.push(`/students/${id}`)
    }

    return (
        <Grid item xs={12} md={4} lg={3}>
            <Card sx={{ minWidth: 275, mt: 2 }}>
                <CardContent>
                    <Typography variant="h5" component="div" noWrap>
                        {isLoading ? <Skeleton /> : nama}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {isLoading ? <Skeleton /> : nim}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {isLoading ? <Skeleton /> : jurusan}
                    </Typography>
                </CardContent>
                <CardActions>
                    {isLoading ? <Skeleton width={"20%"} /> : <Button onClick={(e) => handleDetail(e)} size="small">Edit</Button>}
                </CardActions>
            </Card>
        </Grid>
    );
}

BasicCard.defaultProps = {
    nama: 'Tio Ramadhan',
    nim: 'G64190045',
    jurusan: 'Ilmu Komputer'
}
