import db from "@/lib/prisma-config";
import { createUserSchema } from "@/lib/types/validations";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const body=await req.json();
    console.log("bb: ",body);
    
const userData=createUserSchema.safeParse(body);
console.log("user Data: ",userData);

if(!userData.success){
    
    return NextResponse.json({user:null,message:userData.error},{status:409})
}
const existingUser=await db.user.findUnique({where:{email:body.email}});
const existingUsername=await db.user.findUnique({where:{username:body.username}});

if(existingUser){
    return NextResponse.json({user:null,message:"user with this email already exists"},{status:409})
}
if(existingUsername){
    return NextResponse.json({user:null,message:"user with this username already exists"},{status:409})
}
const hashedPassword=await hash(body.password,10);
const newUser=await db.user.create({data:{...userData.data,password:hashedPassword}});
return NextResponse.json({user:newUser,message:"user created successfuly!"})

}