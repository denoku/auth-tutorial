import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db

//because of next js hot reload in dev mode we need this to working whenever we save a file it peforms a hot reload and would get a warning to many active clients, when hot reload fires it will check if one is active