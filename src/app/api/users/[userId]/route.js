import { nextGetResponse, nextPostResponse } from "@/helper/nextResponse";
import { users } from "@/models/user"
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { userId } = params;
    let getUser = []
    try {
        getUser = await users.findById(userId);
        return nextGetResponse("User fetched", true, 201, getUser)

    } catch (error) {
        return nextGetResponse("User not fetched", false, 400, getUser)
    }
}

export async function DELETE(request, { params }) {
    const { userId } = params;
    try {
        const deleteUser = await users.deleteOne({ _id: userId })
        return nextPostResponse("User deleted", true, 201)
    } catch (error) {
        return nextPostResponse("User not deleted", false, 400)

    }
}

export async function PUT(request, { params }) {
    const { userId } = params;
    const updateData = await request.json();
    let getUser = []

    try {
        const updateUser = await users.findOneAndUpdate({ _id: userId }, updateData, { new: true })
        getUser = await users.findById(userId);
        console.log('userId data',getUser)
        return nextGetResponse("User update", true, 201, getUser)
        //return nextPostResponse("User update", true, 201)

    } catch (error) {
        return nextGetResponse("User not update", false, 400, getUser)

        //return nextPostResponse("User not update", false, 400)
    }
}