import { connectToDB } from "@/lib/connectDB";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { Userinfo } from "@/models/UserInfo";

export async function PUT(req) {
    const { name, image, postalCode, streetAddress, phone, city, country } = await req.json();
    const session = await getServerSession(authOptions);

    await connectToDB();

    await User.updateOne({ email: session?.user?.email }, { name, image });

    const userInfo = await Userinfo.updateOne({ email: session?.user?.email }, { postalCode, streetAddress, phone, city, country, name }, { upsert: true });

    return NextResponse.json({ message: 'Success', data: { ...userInfo } });
}

export async function GET() {
    const session = await getServerSession(authOptions);

    await connectToDB();

    const email = session?.user?.email;

    if(!email) {
        NextResponse.json({})
    }

    const data = await Userinfo.findOne({ email });

    return NextResponse.json({ data });
}