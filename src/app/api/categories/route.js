import { connectToDB } from "@/lib/connectDB";
import { Category } from "@/models/Category";

export async function POST(req) {
    const { name } = await req.json();

    await connectToDB();

    await Category.create({ name });

    return Response.json({ name });
};

export async function PUT(req) {
    const data = await req.json();

    await connectToDB();

    const category = await Category.findByIdAndUpdate({ _id: data._id }, { name: data.name });

    return Response.json({ category });
}

export async function GET(req) {
    await connectToDB();

    const categories = await Category.find();

    return Response.json(categories);
}
