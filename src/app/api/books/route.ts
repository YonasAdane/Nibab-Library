// POST /api/books

//     Description: Add a new book to the catalog (admin or superuser).
//     Usage: Requires book details such as title, author, description, etc.

//app/api/user/[id]/route.ts
import db from "@/lib/prisma-config";
import { createBookSchema } from "@/lib/types/validations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input using Zod
    const result = createBookSchema.safeParse(body);
    console.log("Validation Result:", result);

    if (!result.success) {
      // Return validation error messages
      return NextResponse.json(
        { success: false, errors: result.error.errors },
        { status: 400 }
      );
    }

    // Map validated data
    const { title, author, genre, description, isbn, publicationYear, available } = result.data;

    // Use Prisma to create a new book
    const newBook = await db.book.create({
      data: {
        title,
        author,
        genre,
        description,
        isbn,
        publicationYear,
        available,
      },
    });

    console.log("Created Book:", newBook);
    return NextResponse.json({ success: true, data: newBook });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}


 
export async function GET(req:NextRequest){
    const book=await db.book.findMany({});
    return new NextResponse(JSON.stringify(book));
}
