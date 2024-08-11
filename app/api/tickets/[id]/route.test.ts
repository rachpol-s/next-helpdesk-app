import { GET, PUT, DELETE } from './route'
import { NextRequest } from 'next/server'
import prisma from '../../../../__mock__/prisma'

describe('API Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('GET /api/tickets/:id', () => {
        it('should return the ticket with the given id', async () => {
            const mockTicket = { id: 1, title: 'Test Ticket' }
            prisma.ticket.findUnique.mockResolvedValue(mockTicket)

            const req = new NextRequest(new Request('http://localhost/api/tickets/1'))
            const response = await GET(req, { params: { id: '1' } })
            const data = await response.json()

            expect(response.status).toBe(200)
            expect(data).toEqual(mockTicket)
        })

        it('should handle errors', async () => {
            prisma.ticket.findUnique.mockRejectedValue(new Error('Database error'))

            const req = new NextRequest(new Request('http://localhost/api/tickets/1'))
            const response = await GET(req, { params: { id: '1' } })

            expect(response.status).toBe(500)
        })
    })

    describe('PUT /api/tickets/:id', () => {
        it('should update the ticket with the given id', async () => {
            const mockUpdatedTicket = { id: 1, title: 'Updated Ticket', status: 'Completed' }
            prisma.ticket.update.mockResolvedValue(mockUpdatedTicket)

            const req = new NextRequest(new Request('http://localhost/api/tickets/1', {
                method: 'PUT',
                body: JSON.stringify({ title: 'Updated Ticket', status: 'Completed' }),
            }))
            const response = await PUT(req, { params: { id: '1' } })
            const data = await response.json()

            expect(response.status).toBe(200)
            expect(data).toEqual(mockUpdatedTicket)
        })

        it('should handle errors', async () => {
            prisma.ticket.update.mockRejectedValue(new Error('Database error'))

            const req = new NextRequest(new Request('http://localhost/api/tickets/1', {
                method: 'PUT',
                body: JSON.stringify({ title: 'Updated Ticket', status: 'Completed' }),
            }))
            const response = await PUT(req, { params: { id: '1' } })

            expect(response.status).toBe(500)
        })
    })

    describe('DELETE /api/tickets/:id', () => {
        it('should delete the ticket with the given id', async () => {
            const mockDeletedTicket = { id: 1, title: 'Deleted Ticket' }
            prisma.ticket.delete.mockResolvedValue(mockDeletedTicket)

            const req = new NextRequest(new Request('http://localhost/api/tickets/1', {
                method: 'DELETE'
            }))
            const response = await DELETE(req, { params: { id: '1' } })
            const data = await response.json()

            expect(response.status).toBe(200)
            expect(data).toEqual(mockDeletedTicket)
        })

        it('should handle errors', async () => {
            prisma.ticket.delete.mockRejectedValue(new Error('Database error'))

            const req = new NextRequest(new Request('http://localhost/api/tickets/1', {
                method: 'DELETE'
            }))
            const response = await DELETE(req, { params: { id: '1' } })

            expect(response.status).toBe(500)
        })
    })
})
