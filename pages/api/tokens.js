// import cookies from 'next-cookies'
import cookieParser from "cookie-parser"

export default async function handler(req, res) {
    cookieParser()
    const allCookies = req.cookies
    // console.log(allCookies.jwt)
    res.status(200).json({ tokens: allCookies.jwt })
}