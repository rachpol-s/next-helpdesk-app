import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * @swagger
 * /api/tickets/{id}:
 *   get:
 *     summary: Retrieve a single ticket by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the ticket to retrieve
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       '200':
 *         description: The requested ticket
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       '500':
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/tickets/{id}:
 *   put:
 *     summary: Update a ticket by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the ticket to update
 *         schema:
 *           type: integer
 *           format: int32
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       '200':
 *         description: The updated ticket
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       '500':
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/tickets/{id}:
 *   delete:
 *     summary: Delete a ticket by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the ticket to delete
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       '200':
 *         description: Confirmation of deletion
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       '500':
 *         description: Internal server error
 */
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