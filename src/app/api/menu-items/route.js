import { connectToDB } from "@/lib/connectDB";
import { MenuItem } from "@/models/MenuItems";

export async function POST(req) {
    const data = await req.json();

    await connectToDB();

    const menuItem = await MenuItem.create(data);

    return Response.json({ menuItem });
};

export async function PUT(req) {
    const data = await req.json();

    await connectToDB();

    await MenuItem.findByIdAndUpdate({ _id: data.id }, {...data});

    return Response.json({ message: 'Succesfully updated!' });
};

export async function GET(req) {
    await connectToDB();

    const menuItems = await MenuItem.find();

    return Response.json({ menuItems });
};