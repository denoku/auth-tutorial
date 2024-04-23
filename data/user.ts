import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
    console.log('EMAIL:', email);
    
    try {
        const user = await db.user.findUnique({
            where: {email}
        })
    console.log('USER:', user);

        return user
    } catch {
        return null
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {id}
        })
        return user
    } catch {
        return null
    }
}