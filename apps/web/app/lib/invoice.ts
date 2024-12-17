"use server"

import { API_URL } from "./constants";
import { InvoiceUploadState } from "./type";

export async function registerInvoice(state:InvoiceUploadState, data:FormData): Promise<InvoiceUploadState> {
    const content = data.get("content")
    if (data.get("userId") === null) return {message: "failed to load userId", ok:false}
    const ownerId:number = +data.get("userId")!
    const invalidUpload = content === null || content === "";
    const file = data.get("invoiceFile") as File;
    const buffer = await file.arrayBuffer()
    if(file.size > 1800000) return {message: "file size cannot be bigger than 1.8MB", ok:false}

    const b64Image = Buffer.from(buffer).toString('base64')

    const buffer2 = Buffer.from(b64Image, 'base64')

    const obj = {ownerId: ownerId , content: b64Image}
    const res = await fetch(`${API_URL}/invoice/register`, {
        mode: "no-cors",
        method: "POST",
        headers: {
            "Content-type" : "application/json",
        },
        body: JSON.stringify(obj)
    })
    if(res.ok) return {message: `Uploaded invoice successfully`, ok:true}

    return {message: `failed to upload invoice ${res.statusText}`, ok:false}
}

export async function LoadInvoices(userId:string) {
    const res = await fetch(`${API_URL}/invoice/${userId}`, {
        method:"GET",
    })
    if(res.ok){
        return await res.json()
    }
    return []
} 

export async function LoadOne(id:string) {
    const res = await fetch(`${API_URL}/invoice/findOne/${id}`, {
        method: "GET",
    })

    if(res.ok){ 
        return await res.json()
    }
    return null
}

export async function PostComment(state:InvoiceUploadState, data:FormData): Promise<InvoiceUploadState> {
    const content = data.get('comment');
    if(!content || content === "") return 
    const res = await fetch(`${API_URL}/invoice/comment`, {
        mode: "no-cors",
        method: "POST",
        headers: {
            "Content-type" : "application/json",
        },
        body: JSON.stringify({
            invoiceId: data.get("invoiceId"),
            content: content,
        })
    })

    if(res.ok){
        console.log("deu bom")
    }
}

export async function LoadComments(invoiceId:number) {
    const res = await fetch(`${API_URL}/invoice/findcomments/${invoiceId}`,{
        method:"GET",
    })

    console.log(res)

    if(res.ok){
        return await res.json();
    }

    return [{content:"Failed to load comments"}]
}
