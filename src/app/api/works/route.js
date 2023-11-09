import { connectDB } from "@/helper/db";
import { nextGetResponse, nextPostResponse } from "@/helper/nextResponse";
import { works } from "@/models/works";
import { useSearchParams } from 'next/navigation'
connectDB();
export const GET = async (request,res) => {
    const query = request.url.search;
    const taskStatus=request.nextUrl.searchParams.get('taskStatus')
    const requestedUserId=request.nextUrl.searchParams.get('userId')
    let queryObject={}
    if(taskStatus=="allTasks"){
        queryObject={userId:requestedUserId}
    }
    else{
        queryObject={userId:requestedUserId,status:taskStatus}
    }
    console.log('query',request.nextUrl.searchParams.get('taskStatus'),request.nextUrl.searchParams.get('userId'))
    // const { taskTyp} = query;
    try {
        const allWorks = await works.find(queryObject)
        return nextGetResponse('All works fetched', true, 201, allWorks)
    } catch (error) {
        return nextGetResponse('All works not fetched', false, 400, [])
    }
}
export const POST = async (request) => {
    const workEntry = await request.json();
    console.log('work is',workEntry)
    try {
        const work = await new works(workEntry);
        work.save()
        console.log('work is save',workEntry)

        return nextPostResponse('work entry added!', true, 201)
    } catch (error) {
        console.log(error)
        return nextPostResponse('work entry not added', false, 400)
    }
}



