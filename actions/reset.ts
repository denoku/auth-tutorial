'use server'
import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import * as z from 'zod'

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    console.log('VALUES', values);
    
    const validatedFields = ResetSchema.safeParse(values)

    if (!validatedFields.success) {
        return {error: 'Invalid email!'}
    }

    const {email} = validatedFields.data

    const existingUser = await getUserByEmail(email)
    console.log('EXISTING USER:', existingUser);
    
    if (!existingUser) {
        return {error: 'Email not found!'}
    }

    //TODO: Generate token & send email

    return {success: 'Reset email sent!'}
}