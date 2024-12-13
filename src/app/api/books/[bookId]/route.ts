import db from "@/lib/prisma-config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:Promise<{bookId:string}>}){

    const bookId=parseInt((await params).bookId) ;
    
    try {
        const books=await db.book.findUnique({where:{id:bookId }})
        return NextResponse.json(books)
    } catch (error) {
        return NextResponse.json({message:"cannot find book with this id"},{status:400})

    }
}

export async function DELETE(req:NextRequest,{params}:{params:Promise<{bookId:string}>}){
    const bookId=parseInt((await params).bookId)
    const book=await db.book.findUnique({where:{id:bookId}});
    if(!book){
        return NextResponse.json({message:"there is no book with this ID"},{status:400})
    }
    try {
        const deletedBook=await db.book.delete({where:{id:bookId}})
        return NextResponse.json(deletedBook)
    } catch (error) {
        return NextResponse.json({message:"Error deleting book"},{status:400})
    }

}