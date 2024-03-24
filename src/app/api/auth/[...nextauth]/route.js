import { connectToDB } from "@/lib/connectDB";
import clientPromise from "@/lib/mongoAdapter";
import { User } from "@/models/User";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    session: {
        strategy: 'jwt'
    },
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "test@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { email, password } = credentials;

                await connectToDB();
                
                const user = await User.findOne({ email });

                if (!user) {
                    return null; // User not found
                }

                const passwordIsCorrect = await compare(password, user.password);

                if (passwordIsCorrect) {
                    return {
                        id: user._id,
                        email: user.email
                    };
                }

                return null; // Incorrect password
            }
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === 'google') {
                const { name, email } = user;
                
                await connectToDB();
                const isUserExist = await User.findOne({ email });

                if (!isUserExist) {
                    const newUser = new User({ name, email });
                    await newUser.save();
                }
            }

            return true;
        },
        async jwt({ token, trigger, session }) {
            if (trigger === "update" && session?.name) {
                token.name = session.name;
            }
            return token;
        },
        async session({ session }) {
            return session;
        }
    }
}; 

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
