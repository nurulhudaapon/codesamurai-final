import { cn } from "@/utils/cn"
import { TableHTMLAttributes } from "react"

export const Table = ({ className, children, ...props }: TableHTMLAttributes<HTMLTableElement>) => {
    return (
        <div className="relative overflow-x-auto border sm:rounded-lg">
            <table {...props} className={cn("w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400", className)}>
                {children}
            </table>
        </div>
    )
}

export const TableHead = ({ children, ...props }: TableHTMLAttributes<HTMLTableSectionElement>) => {
    return (
        <thead {...props} className="text-xs text-gray-700 uppercase text-red bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {children}
        </thead>
    )
}

export const TableBody = ({ children, ...props }: TableHTMLAttributes<HTMLTableSectionElement>) => {
    return (
        <tbody {...props}>
            {children}
        </tbody>
    )
}

export const TableRow = ({ children, ...props }: TableHTMLAttributes<HTMLTableRowElement>) => {
    return (
        <tr {...props} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            {children}
        </tr>
    )
}

export const TableHeader = ({ children, ...props }: TableHTMLAttributes<HTMLTableCellElement>) => {
    return (
        <td {...props} className="px-6 py-3 font-bold text-black bg-slate-100">
            {children}
        </td>
    )
}

export const TableCell = ({ children, className, ...props }: TableHTMLAttributes<HTMLTableCellElement>) => {
    return (
        <td {...props} className={cn("px-6 py-4 text-black whitespace-nowrap", className)}>
            {children}
        </td>
    )
}