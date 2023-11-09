import { nextGetResponse, nextPostResponse } from "@/helper/nextResponse";
import { users } from "@/models/user";
import { NextResponse } from "next/server";
import { connectDB } from "../../../../src/helper/db";
import bcrypt from 'bcrypt'

connectDB();
export async function GET(request) {
    let allUsers = []
    try {
        allUsers = await users.find();
        return nextGetResponse('All users data fetched', true, 201, allUsers)
    } catch (error) {
        return nextGetResponse('All users data not fetched', false, 400, allUsers)
    }
}

export async function POST(request) {
    const givenUser = await request.json();
    console.log('given user',givenUser)
    try {
        const hashPassword = bcrypt.hashSync(givenUser.password, 10);
        givenUser.password=hashPassword
        const newUser = await new users(givenUser)
        newUser.save();
        return nextPostResponse('User created', true, 201)
    } catch (error) {
        return nextPostResponse('User not created', false, 400)
    }
}

