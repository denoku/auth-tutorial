
import NextAuth from "next-auth"
//import AzureADProvider from "next-auth/providers/azure-ad";
//import GitHub from 'next-auth/providers/g'
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";
import { getAccountByUserId } from "./data/account";


// export const {
//     handlers: {GET, POST},
//     auth,
// } = NextAuth({
//     providers: [GitHub]
// })
export const {handlers: { GET, POST }, auth, signIn, signOut} = NextAuth ({
    pages: {
        signIn: '/auth/login',
        error: '/auth/error'
    },
    events: {
       async linkAccount({user}) {
        await db.user.update({
            where: {id: user.id},
            data: {emailVerified: new Date()}
        })
       }
    },
    callbacks: {
        async signIn({user, account}) {
            console.log({user, account});
            
            //Allow OAuth without email verification
            if (account?.provider !== 'credentials') return true

            const existingUser = await getUserById(user.id)

            //Prevent sign in without email verification
            if (!existingUser?.emailVerified) return false
            //TODO: Add 2FA
            return true
        },
        async session({token, session}) {
        if (token.sub && session.user) {
            session.user.id = token.sub
        }

        if (token.role && session.user) {
            session.user.role = token.role as UserRole
        }

        if (session.user) {
            session.user.name = token.name
            session.user.email = token.email
            session.user.isOAuth = token.isOAuth as boolean
        }
            return session
        },
        async jwt({token}) {
            
         if (!token.sub) return token
            //prisma doesn't work on the edge so that's why we need auth.config
         const existingUser = await getUserById(token.sub)
            //console.log('EXISTINGUSER:', existingUser);
            
         if (!existingUser) return token

        const exisitingAccount = await getAccountByUserId(existingUser.id)

         token.isOAuth = !!exisitingAccount
         token.name = existingUser.name
         token.email = existingUser.email
         token.role = existingUser.role
            return token
        }
    },
    adapter: PrismaAdapter(db),
     session: {strategy: 'jwt'},
     ...authConfig,
})