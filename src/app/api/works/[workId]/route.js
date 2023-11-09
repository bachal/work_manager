import { nextGetResponse, nextPostResponse } from "@/helper/nextResponse";
import { works } from "@/models/works";

export const PUT = async (request, { params }) => {
    const { workId } = params;
    const requestedObj = await request.json();
    let allWorks=[]
    try {
        const updateWork = await works.updateOne({ _id: workId }, requestedObj)
        allWorks = await works.find()
        return nextGetResponse('Work entry updated', true, 201,allWorks)
    } catch (error) {
        return nextGetResponse('Work entry not updated', false, 400,allWorks)
    }
}

export const DELETE = async (request, { params }) => {
    const { workId } = params;
    let allWorks=[]
    console.log('id get',workId)
    try {
        const deleteWork = await works.deleteOne({ _id: workId })
        allWorks = await works.find()
        return nextGetResponse('Work entry deleted', true, 201,allWorks)
    } catch (error) {
        return nextGetResponse('Work entry not delete', false, 400,allWorks)
    }
}