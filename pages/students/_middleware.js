import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken';

export default function middleware(req) {
    const token = req.cookies.jwt;
    const url = req.url;
    if (!token) {
        return NextResponse.redirect('/auth/login')
    }
    // console.log(token)
    // if (!token && url != '/auth/login') {
    //     return NextResponse.redirect('/auth/login')
    // }

}