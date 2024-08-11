import { BasePagination } from '../components/base'
import IconEdit from '../../public/icons/IconEdit'
import IconTrash from '../../public/icons/IconTrash'
import { Status } from '../enums/status'
import moment from 'moment'

interface DataInterface {
    entities?: TicketsInterface[]
    page_information?: PageInformationInterface
}

interface PageInformationInterface {
    count: number
    page: number
    last_page: number
    size: number
}

interface TicketsInterface {
    id: number
    title: string
    description?: string
    contact_information?: string
    status: Status
    created_at: Date
    updated_at: Date
}

interface TicketTableProps {
    data?: DataInterface
    onEdit: (id: number) => void
    onDelete: (id: number) => void
    onPageChange: (page: number) => void
    isCanDelete: boolean
}

export default function TicketFilter({ data, onEdit, onDelete, onPageChange, isCanDelete }: TicketTableProps) {
    const columns = [
        { name: 'row' },
        { name: 'title' },
        { name: 'description' },
        { name: 'contact information' },
        { name: 'status' },
        { name: 'created at' },
        { name: 'updated at' },
        { name: 'action' }
    ]

    const statusColor = (statusName: string) => {
        if (statusName === 'Pending') return 'bg-pending-status'
        if (statusName === 'Accepted') return 'bg-accepted-status'
        if (statusName === 'Resolved') return 'bg-resolved-status'
        if (statusName === 'Rejected') return 'bg-rejected-status'
    }

    const classTH = 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
    const classTD = 'px-6 py-4'

    return (
        (data?.entities?.length || 0) > 0 ?
            (<div className="pt-4 px-6 pb-6  shadow rounded-lg bg-white">
                <p className="mb-2 font-medium">Total data {data?.page_information?.count} items</p>
                <div className="shadow rounded-lg overflow-hidden border-b border-gray-200 ">
                    <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                {columns.map((column, index) => (
                                    <th key={index} className={classTH}>
                                        {column.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data?.entities?.map((ticket: TicketsInterface, index) => (
                                <tr key={ticket.id}>
                                    <td className={`${classTD} w-20`}>
                                        <div className="text-sm font-medium text-black">
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td className={`${classTD} max-w-40`}>
                                        <div className="text-sm font-medium text-black truncate">
                                            {ticket.title}
                                        </div>
                                    </td>
                                    <td className={`${classTD} max-w-40`}>
                                        <div className="text-sm font-medium text-black truncate">
                                            {ticket.description}
                                        </div>
                                    </td>
                                    <td className={`${classTD} max-w-40`}>
                                        <div className="text-sm font-medium text-black truncate">
                                            {ticket.contact_information}
                                        </div>
                                    </td>
                                    <td className={`${classTD} w-44`}>
                                        <div className={`text-sm font-medium text-white text-center p-0.5 rounded-xl w-24 ${statusColor(ticket.status)}`}>
                                            {ticket.status}
                                        </div>
                                    </td>
                                    <td className={`${classTD} w-48`}>
                                        <div className="text-sm font-medium text-black">
                                            {moment(ticket.created_at).format('DD/MM/YYYY HH:mm:ss')}
                                        </div>
                                    </td>
                                    <td className={`${classTD} w-48`}>
                                        <div className="text-sm font-medium text-black">
                                            {moment(ticket.updated_at).format('DD/MM/YYYY HH:mm:ss')}
                                        </div>
                                    </td>
                                    <td className={`${classTD} w-20`}>
                                        <div className="flex justify-center space-x-3">
                                            <div className="w-7 text-green-500 cursor-pointer" onClick={() => onEdit(ticket.id)}>
                                                <IconEdit />
                                            </div>
                                            {isCanDelete && (<div className="w-7 text-red-500 cursor-pointer" onClick={() => onDelete(ticket.id)}>
                                                <IconTrash />
                                            </div>)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {(data?.page_information?.last_page || 1) > 1 && <BasePagination
                    totalPages={data?.page_information?.last_page}
                    currentPage={data?.page_information?.page}
                    onPageChange={onPageChange}
                />}
            </div>) : (<div className="p-6  shadow rounded-lg bg-white py-52">
                <div className="text-center text-lg py-4 text-gray-500">No records found.</div>
            </div>)
    )
}

export type { DataInterface }