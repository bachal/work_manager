import { nextGetResponse, nextPostResponse } from "@/helper/nextResponse";
import { users } from "@/models/user"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextResponse } from "next/server";


export const POST = async (request) => {
    const { email, password } = await request.json();
    console.log('get login data', email,password)
    try {
        const user = await users.findOne({ email: email })
        if (user) {
            console.log(user,'user')
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_KEY);
                delete user['password']; 
                const response = NextResponse.json({ message: "login successfully", success: true, status: 201,userData:user })
                response.cookies.set('authToken', token, { expiresIn: '1d', httpOnly: false })
                console.log('match ok')
                return response
            }
            else {
                return nextPostResponse('username or password are incorrect', false, 400)
            }
        }
        else {
            throw new error('user not found')
        }

    } catch (error) {
        return nextPostResponse('user not found', false, 400)
    }

}