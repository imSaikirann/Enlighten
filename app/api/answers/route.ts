import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const body = await req.json();
    try {
        const data = await prisma.answers.create({
            data: {
                questionId: body.questionId,
                answerText: body.answerText,
            },
        });

        return NextResponse.json({ message: "Posted Successfully", data });
    } catch (error) {
        console.error(error); 
        return NextResponse.json({ message: "Problem in adding" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const data = await prisma.answers.findMany();
        return NextResponse.json(data);
        
    } catch (error) {
        console.error(error); 
        return NextResponse.json({ message: "Error processing request", error }, { status: 400 });
    }
}
