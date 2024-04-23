import { UserRole } from "@prisma/client"
import NextAuth, {DefaultSession} from "next-auth"

export type ExtendedUser = DefaultSession['user'] & {
    role: UserRole
    isOAuth: boolean
}

declare module 'next-auth' {
    interface Session {
       user: ExtendedUser
}
}

// import {JWT} from '@auth/core/jwt'

// declare module '@auth/core/jwt' {
//     interface JWT {
//         role?: 'ADMIN' | 'USER'
//     }
// }