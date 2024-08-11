
import { useState } from 'react'
import { BaseInput, BaseDropdown, BaseButton } from '../components/base'
import { Status } from '../enums/status'

interface TicketFilterInterface {
    title?: string
    status?: string | number
    sort?: string | number
    page?: number
    size?: number
}

interface TicketFilterProps {
    onSearch: (filterData: TicketFilterInterface) => void
}

export default function TicketFilter({ onSearch }: TicketFilterProps) {
    const statusOptions = [
        { label: 'All', value: 'ALL' },
        { label: 'Pending', value: Status.Pending },
        { label: 'Accepted', value: Status.Accepted },
        { label: 'Resolved', value: Status.Resolved },
        { label: 'Rejected', value: Status.Rejected }
    ]

    const sortOptions = [
        { label: 'Created', value: 'created_at' },
        { label: 'Updated', value: 'updated_at' },
        { label: 'Status', value: 'status' }
    ]

    const [title, setTitle] = useState<string>('')
    const inputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const [status, setStatus] = useState<string | number>('ALL')
    const handleStatus = (value: string | number) => {
        setStatus(value)
    }

    const [sort, setSort] = useState<string | number>('created_at')
    const handleSort = (value: string | number) => {
        setSort(value)
    }

    const clearFilter = () => {
        setTitle('')
        setStatus('ALL')
        setSort('created_at')
    }
    const handleSearch = () => {
        onSearch({ title, status: status === 'ALL' ? '' : status, sort })
    }

    return (
        <div className="p-6 shadow rounded-lg bg-white mb-6">
            <div className="grid grid-cols-2 gap-x-4">
                <BaseInput
                    label="Title"
                    placeholder="Enter title"
                    value={title}
                    onChange={inputTitle}
                />
                <div className="grid grid-cols-2 gap-x-4">
                    <BaseDropdown
                        label="Status"
                        placeholder="Choose an option"
                        options={statusOptions}
                        value={status}
                        onChange={handleStatus}
                    />
                    <BaseDropdown
                        label="Sort by"
                        placeholder="Choose an option"
                        options={sortOptions}
                        value={sort}
                        onChange={handleSort}
                    />
                </div>
            </div>
            <div className="flex space-x-2">
                <BaseButton className="ml-auto" type="submit" color="gray" onClick={clearFilter}>Clear</BaseButton>
                <BaseButton type="submit" color="green" onClick={handleSearch}>Search</BaseButton>
            </div>
        </div>
    )
}

export type { TicketFilterInterface }