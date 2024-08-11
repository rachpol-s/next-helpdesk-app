import { GET, POST } from './route'
import { NextRequest } from 'next/server'
import prisma from '../../../__mock__/prisma'

describe('API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/tickets', () => {
    it('should return tickets and page information', async () => {
      const req = new NextRequest(new Request('http://localhost/api/tickets?page=1&size=10'))
      const mockTickets = [{ id: 1, title: 'Test Ticket' }]
      prisma.ticket.count.mockResolvedValue(1)
      prisma.ticket.findMany.mockResolvedValue(mockTickets)

      const response = await GET(req)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.entities).toEqual(mockTickets)
      expect(data.page_information.count).toBe(1)
      expect(data.page_information.page).toBe(1)
      expect(data.page_information.last_page).toBe(1)
      expect(data.page_information.size).toBe(10)
    })

    it('should handle errors', async () => {
      const req = new NextRequest(new Request('http://localhost/api/tickets'))
      prisma.ticket.count.mockRejectedValue(new Error('Database error'))

      const response = await GET(req)
      expect(response.status).toBe(500)
    })
  })

  describe('POST /api/tickets', () => {
    it('should create a ticket and return it', async () => {
      const req = new NextRequest(new Request('http://localhost/api/tickets', {
        method: 'POST',
        body: JSON.stringify({ title: 'New Ticket', status: 'Pending' }),
      }))
      const mockTicket = { id: 1, title: 'New Ticket', status: 'Pending' }
      prisma.ticket.create.mockResolvedValue(mockTicket)

      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(mockTicket)
    })

    it('should handle errors', async () => {
      const req = new NextRequest(new Request('http://localhost/api/tickets', {
        method: 'POST',
        body: JSON.stringify({ title: 'New Ticket', status: 'Pending' }),
      }))
      prisma.ticket.create.mockRejectedValue(new Error('Database error'))

      const response = await POST(req)
      expect(response.status).toBe(500)
    })
  })
})
