import NextAuth, { type AuthOptions } from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '@/src/libs/prismadb'
import Credentials from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        Credentials({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'email',
                    type: 'email'
                },
                password: {
                    label: 'password',
                    type: 'password'
                }
            },
            async authorize(credentials) {
                if (credentials?.email && credentials?.password) {
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email
                        }
                    })
                    if (!user || !user?.hashedPassword) throw new Error('invalid user or password')
                    const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
                    if (!isCorrectPassword) {
                        throw new Error('invalid use or  password');
                    }
                    return user;
                } else {
                    throw new Error('invalid credentials');
                }
            }
        }),

    ],
    pages: {
        signIn: '/login',
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,

}
export default NextAuth(authOptions);