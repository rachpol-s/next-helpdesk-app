import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const ticketId = Number(params.id)
        const ticket = await prisma.ticket.findUnique({
            where: {
                id: ticketId
            }
        })
        return Response.json(ticket)
    } catch (error) {
        return new Response(error as BodyInit, { status: 500 })
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const { title, status, description, contact_information } = await req.json()
        const ticketId = Number(params.id)

        const updateTicket = await prisma.ticket.update({
            where: {
                id: ticketId
            },
            data: {
                title,
                status,
                description: description || null,
                contact_information: contact_information || null
            }
        })
        return Response.json(updateTicket)
    } catch (error) {
        return new Response(error as BodyInit, { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const ticketId = Number(params.id)
        const deleteTicket = await prisma.ticket.delete({
            where: {
                id: ticketId
            }
        })
        return Response.json(deleteTicket)
    } catch (error) {
        return new Response(error as BodyInit, { status: 500 })
    }
}