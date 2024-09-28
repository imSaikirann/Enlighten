import { PrismaClient} from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient()

export async function POST(req:NextRequest) {
    const body = await req.json()
    try {
        const data = await prisma.categories.create({
            data:{
                name:body.name
            }
        })

        return NextResponse.json({ message: "Tag Added successfully", data: data });
    } catch (error) {
        return NextResponse.json({ message: "Error processing request", error }, { status: 400 });
    }
}

export async function GET() {
    try {
        const data = await prisma.categories.findMany()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ message: "Error processing request", error }, { status: 400 });
    }
}