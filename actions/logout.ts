'use server'

import { signOut } from "@/auth"

export const logout = async () => {
    //some server stuff (clear info from user etc.)
    await signOut()
}