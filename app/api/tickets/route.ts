import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
    try {
        const url = new URL(req.url)
        const title = url.searchParams.get('title') || ''
        const status = url.searchParams.get('status') || ''
        const sort = url.searchParams.get('sort') || 'created_at'
        const page = parseInt(url.searchParams.get('page') || '1', 10)
        const size = parseInt(url.searchParams.get('size') || '20', 10)

        const where: any = {}
        if (title) where.title = { contains: title, mode: 'insensitive' }
        if (status) where.status = status

        const totalTickets = await prisma.ticket.count({ where })
        const sortOrder = sort === 'updated_at' ? 'desc' : 'asc'
        const tickets = await prisma.ticket.findMany({
            where,
            orderBy: {
                [sort]: sortOrder
            },
            skip: (page - 1) * size,
            take: size
        })

        const lastPage = Math.ceil(totalTickets / size)
        const pageInformation = {
            count: totalTickets,
            page,
            last_page: lastPage,
            size
        }

        return new Response(JSON.stringify({
            entities: tickets,
            page_information: pageInformation
        }), {
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (error) {
        return new Response(error as BodyInit, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const { title, status, description, contact_information } = await req.json()
        const createTicket = await prisma.ticket.create({
            data: {
                title,
                status,
                description: description || null,
                contact_information: contact_information || null
            }
        })
        return Response.json(createTicket)
    } catch (error) {
        return new Response(error as BodyInit, { status: 500 })
    }
}