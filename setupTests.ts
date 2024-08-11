import prisma from './__mock__/prisma'

jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn(() => prisma),
}))
