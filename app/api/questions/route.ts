import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = await prisma.question.create({
            data :{
                questionName:body.questionName,
                category:body.category
            }
        })
        return NextResponse.json({ message: "Data Added successfully", data: data });
    } catch (error) {
        console.log("Error parsing JSON body:", error);
    
        return NextResponse.json({ message: "Error processing request", error }, { status: 400 });
    }
}
