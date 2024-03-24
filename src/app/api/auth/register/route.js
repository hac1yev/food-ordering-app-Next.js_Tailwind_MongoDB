import { connectToDB } from "@/lib/connectDB";
import { User } from "@/models/User";
import { hash } from "bcrypt";

export async function POST(req) {
    const { email, password } = await req.json();

    const hashedPassword = await hash(password, 10);

    if(password.length < 6) {
        return Response.json({ message: 'Password letters must be over 6!' });
    }

    await connectToDB();

    const user = await User.findOne({ email });
    
    if(user) {
        return Response.json({ message: 'Email already exists!' });
    }

    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();

    return Response.json({ message: 'Registered successfully!' });
};