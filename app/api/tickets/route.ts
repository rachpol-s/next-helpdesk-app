import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * @swagger
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int32
 *         title:
 *           type: string
 *         status:
 *           type: string
 *         description:
 *           type: string
 *           nullable: true
 *         contact_information:
 *           type: string
 *           nullable: true
 */

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Retrieve a list of tickets
 *     parameters:
 *       - name: title
 *         in: query
 *         description: Filter by ticket title
 *         required: false
 *         schema:
 *           type: string
 *       - name: status
 *         in: query
 *         description: Filter by ticket status
 *         required: false
 *         schema:
 *           type: string
 *       - name: sort
 *         in: query
 *         description: Sort tickets by field
 *         required: false
 *         schema:
 *           type: string
 *           enum: [created_at, updated_at]
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: size
 *         in: query
 *         description: Number of tickets per page
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       '200':
 *         description: A list of tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 entities:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ticket'
 *                 page_information:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                       format: int32
 *                     page:
 *                       type: integer
 *                       format: int32
 *                     last_page:
 *                       type: integer
 *                       format: int32
 *                     size:
 *                       type: integer
 *                       format: int32
 *       '500':
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Create a new ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       '201':
 *         description: The created ticket
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       '500':
 *         description: Internal server error
 */
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