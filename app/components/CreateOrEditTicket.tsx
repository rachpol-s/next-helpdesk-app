import { useEffect, useState } from 'react'
import axios from 'axios'
import { BaseInput, BaseTextarea, BaseDropdown, BaseButton, BaseLoading } from '../components/base'
import { Status } from '../enums/status'

interface CreateOrEditTicketProps {
    id: number | undefined
    onCreateOrEdit: () => void
}

export default function CreateOrEditTicket({ id, onCreateOrEdit }: CreateOrEditTicketProps) {
    const statusOptions = [
        { label: 'Pending', value: Status.Pending },
        { label: 'Accepted', value: Status.Accepted },
        { label: 'Resolved', value: Status.Resolved },
        { label: 'Rejected', value: Status.Rejected }
    ]

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoadingFullPage, setIsLoadingFullPage] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const inputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const [status, setStatus] = useState<string | number>('')
    const handleStatus = (value: string | number) => {
        setStatus(value)
    }

    const [description, setDescription] = useState<string>('')
    const inputDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value)
    }

    const [contactInformation, setContactInformation] = useState<string>('')
    const inputContactInformation = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContactInformation(event.target.value)
    }

    const createNewTicket = async () => {
        try {
            const params = {
                title,
                status,
                description,
                contact_information: contactInformation
            }
            await axios.post('/api/tickets', params)
        } catch (error) {
            console.log('error', error)
        }
    }

    const updateTicket = async () => {
        try {
            const params = {
                title,
                status,
                description,
                contact_information: contactInformation
            }
            await axios.put(`/api/tickets/${id}`, params)
        } catch (error) {
            console.log('error', error)
        }
    }

    const fetchOneTicket = async (id: number) => {
        setIsLoading(true)
        try {
            const res = await axios.get(`/api/tickets/${id}`)
            const ticket = res.data
            setTitle(ticket.title)
            setStatus(ticket.status)
            setDescription(ticket.description || '')
            setContactInformation(ticket.contact_information || '')
            setIsLoading(false)
        } catch (error) {
            console.error('error', error)
            setIsLoading(false)
        }
    }

    const createOrEdit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!title || !status) return

        setIsLoadingFullPage(true)
        if (id) {
            await updateTicket()
        } else {
            await createNewTicket()
        }
        onCreateOrEdit()
        setIsLoadingFullPage(false)
    }

    useEffect(() => {
        if (id) {
            fetchOneTicket(id)
        } else {
            setTitle('')
            setStatus('')
            setDescription('')
            setContactInformation('')
        }
    }, [id])

    return (
        <>
            {isLoading && <BaseLoading message="Fetching ticket..." />}
            {isLoadingFullPage && <BaseLoading fullPage message="Processing..." />}
            {!isLoading && (
                <form onSubmit={createOrEdit}>
                    <div className="grid grid-cols-2 gap-x-4">
                        <BaseInput
                            label="Title"
                            placeholder="Enter title"
                            required={true}
                            value={title}
                            onChange={inputTitle}
                        />
                        <BaseDropdown
                            label="Status"
                            placeholder="Choose an option"
                            options={statusOptions}
                            value={status}
                            required={true}
                            onChange={handleStatus}
                        />
                    </div>
                    <BaseTextarea
                        label="Description"
                        placeholder="Enter the description"
                        value={description}
                        onChange={inputDescription}
                    />
                    <BaseTextarea
                        label="Contact Information"
                        placeholder="Enter the contact information"
                        value={contactInformation}
                        onChange={inputContactInformation}
                    />
                    <div className="flex">
                        <BaseButton className="ml-auto" type="submit">{id ? 'Edit' : 'Create'}</BaseButton>
                    </div>
                </form>
            )}
        </>
    )
}