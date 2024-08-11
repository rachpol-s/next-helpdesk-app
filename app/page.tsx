'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { BaseModal, BaseButton, BaseLoading } from './components/base'
import TicketFilter from './components/TicketFilter'
import TicketTable from './components/TicketTable'
import CreateOrEditTicket from './components/CreateOrEditTicket'
import { TicketFilterInterface } from './components/TicketFilter'
import { DataInterface } from './components/TicketTable'

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [filter, setFilter] = useState<TicketFilterInterface>({
    title: '',
    status: '',
    sort: '',
    page: 1,
    size: 5
  })
  const setDataFilter = (newFilter: TicketFilterInterface) => {
    setFilter(prev => ({ ...prev, ...newFilter }))
  }
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const toggleModal = () => {
    setIsShowModal(prev => !prev)
  }
  const [tickets, setTickets] = useState<DataInterface | undefined>(undefined)
  const [ticketId, setTicketId] = useState<number | undefined>(undefined)

  const fetchTicket = async (filter?: TicketFilterInterface) => {
    setIsLoading(true)
    try {
      const res = await axios.get('/api/tickets', {
        params: filter
      })
      setIsLoading(false)
      return setTickets(res.data)
    } catch (error) {
      console.error('error', error)
      setIsLoading(false)
      return []
    }
  }
  const deleteTicketById = async (id: number) => {
    try {
      await axios.delete(`/api/tickets/${id}`)
      fetchTicket(filter)
    } catch (error) {
      console.error('error', error)
    }
  }

  const fetchAndClose = async () => {
    toggleModal()
    await fetchTicket(filter)
  }

  const openModalById = (id: number) => {
    setTicketId(id)
    toggleModal()
  }

  useEffect(() => {
    fetchTicket(filter)
  }, [filter])

  return (
    <div className="bg-gray-100 p-8 h-screen overflow-y-auto">
      <TicketFilter onSearch={setDataFilter} />

      <div className="flex mb-2">
        <BaseButton className="ml-auto" color="green" onClick={toggleModal}>Create Ticket</BaseButton>
      </div>

      {isLoading ? (
        <BaseLoading message="Fetching tickets..." />
      ) : (
        <TicketTable data={tickets} isCanDelete={false} onEdit={openModalById} onDelete={deleteTicketById} onPageChange={(page) => setDataFilter({ page })} />
      )}

      <BaseModal
        title={ticketId ? "Edit Ticket" : "Create Ticket"}
        width="700"
        isOpen={isShowModal}
        onClose={() => {
          toggleModal()
          setTicketId(undefined)
        }}
      >
        <CreateOrEditTicket id={ticketId} onCreateOrEdit={fetchAndClose} />
      </BaseModal>
    </div>
  )
}
