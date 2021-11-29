export default function Login() {
    return (
        <div>
            ini login page
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const token = ctx.req.cookies.jwt;
    if (token) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: { isLogin: token ? true : false }
    }
}
