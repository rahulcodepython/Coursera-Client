"use client"
import * as React from "react"
import {
    ColumnDef,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable, Row as RowType, Table as TableType
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type RecordType = {
    id: string
    name: string
    email: string
    courseCount: number
    date: string
    investment: number
    referral: string
}

const UsersPage = () => {
    const ROWS_PER_PAGE = 2
    const [data, setData] = React.useState<RecordType[]>([
        {
            id: '1',
            name: 'John Doe',
            email: 'xyz@gmail.com',
            courseCount: 5,
            date: '2021-10-10',
            investment: 100,
            referral: 'xyz'
        },
        {
            id: '1',
            name: 'John Doe',
            email: 'xyz@gmail.com',
            courseCount: 5,
            date: '2021-10-10',
            investment: 100,
            referral: 'xyz'
        },
        {
            id: '1',
            name: 'John Doe',
            email: 'xyz@gmail.com',
            courseCount: 5,
            date: '2021-10-10',
            investment: 100,
            referral: 'xyz'
        },
        {
            id: '1',
            name: 'John Doe',
            email: 'xyz@gmail.com',
            courseCount: 5,
            date: '2021-10-10',
            investment: 100,
            referral: 'xyz'
        },
    ])
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [filters, setFilters] = React.useState<string>('')
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(ROWS_PER_PAGE)
    const [rowsPerPageDropDown, setRowsPerPageDropDown] = React.useState<number>(ROWS_PER_PAGE)
    const [totalRecords, setTotalRecords] = React.useState<number>(0)
    const [hasNext, setHasNext] = React.useState(false)
    const [page, setPage] = React.useState(1)
    const [isFetching, setIsFetching] = React.useState(false)
    const [hasMore, setHasMore] = React.useState(true)

    const rowsOption: (number)[] = [2, 4, 6]

    const columnsList = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'courseCount', label: 'Course Purchased' },
        { key: 'date', label: 'Date of Join' },
        { key: 'investment', label: 'Investment' },
        { key: 'referral', label: 'Referral' }
    ]

    const columns: ColumnDef<RecordType>[] = [
        {
            id: "select",
            accessorKey: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
    ];
    columnsList.forEach((columnValue) => {
        columns.push({
            id: columnValue.key,
            accessorKey: columnValue.key,
            header: ({ column }) => {
                return <Button variant="ghost" className="capitalize"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    {columnValue.label}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            },
            cell: ({ row }) => (
                <div className={columnValue.key !== "email" ? "capitalize" : ""}>{row.getValue(columnValue.key)}</div>
            ),
        });
    });

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onGlobalFilterChange: setFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            globalFilter: filters,
            columnVisibility,
            rowSelection,
        },
    })

    React.useEffect(() => {
        const handler = async () => {
            table.setPageSize(ROWS_PER_PAGE)
            setRowsPerPageDropDown(ROWS_PER_PAGE)
        }
        handler()
    }, [table])

    React.useEffect(() => {
        const handler = async () => {
        }
        handler()
    }, [page])

    React.useEffect(() => {
        if (data.length < totalRecords) {
            setHasMore(true)
        } else {
            setHasMore(false)
        }
    }, [data, totalRecords])

    return <div className="w-full p-4">
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between py-4">
                    <div className="flex flex-col gap-1.5">
                        <CardTitle>
                            All Users
                        </CardTitle>
                        <CardDescription>
                            List of all users.
                        </CardDescription>
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>

                        <Menubar>
                            <MenubarMenu>
                                <MenubarTrigger>Columns</MenubarTrigger>
                                <MenubarContent>
                                    {
                                        columns.map((column) => {
                                            return !(column.id == 'select' || column.id == 'actions') &&
                                                <MenubarCheckboxItem
                                                    className="capitalize cursor-pointer"
                                                    key={column.id}
                                                    checked={table.getColumn(column.id ?? '')?.getIsVisible()}
                                                    onCheckedChange={() => table.getColumn(column.id ?? '')?.toggleVisibility()}>
                                                    {column.id}
                                                </MenubarCheckboxItem>
                                        })
                                    }
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="cursor-pointer" onClick={() => {
                                    setSorting([])
                                    setFilters('')
                                    setColumnVisibility({})
                                }}>Unfiilter</MenubarTrigger>
                            </MenubarMenu>
                        </Menubar>
                        <Input
                            placeholder="Search..."
                            value={filters}
                            onChange={(event) => setFilters(event.target.value)}
                            className="max-w-lg"
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {
                                table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return <TableHead key={header.id}>
                                                {
                                                    header.isPlaceholder ? null : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )
                                                }
                                            </TableHead>
                                        })}
                                    </TableRow>
                                ))
                            }
                        </TableHeader>
                        <TableBody>
                            {
                                isFetching ? <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        Fetching...
                                    </TableCell>
                                </TableRow> : table.getRowModel().rows?.length ? table.getRowModel().rows.map((row) => {
                                    return <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}>
                                        {
                                            row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} className={cell.column.columnDef.id === 'select' || cell.column.columnDef.id === 'actions' ? "px-4" : "px-8"}>
                                                    {
                                                        flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )
                                                    }
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                }) : <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-between py-4">
                    <div className="text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected
                    </div>
                    <div className={'text-sm text-muted-foreground'}>
                        Shows {table.getFilteredRowModel().rows.length < rowsPerPage ? table.getFilteredRowModel().rows.length : rowsPerPage} out
                        of {table.getFilteredRowModel().rows.length} rows
                    </div>
                </div>
            </CardContent>
            <CardFooter className="justify-center gap-4">
                <Pagination className={'w-fit mx-0'}>
                    <PaginationContent>
                        <PaginationItem>
                            {
                                table.getCanPreviousPage() ? <PaginationPrevious onClick={() => {
                                    if (table.getCanPreviousPage()) {
                                        setPage(page - 1)
                                        table.previousPage()
                                    }
                                }} className="cursor-pointer" /> : <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pl-2.5 cursor-not-allowed opacity-50">
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </span>
                            }
                        </PaginationItem>
                        {
                            Array.from({ length: ((totalRecords / rowsPerPage) + (totalRecords % rowsPerPage === 0 ? 0 : 1)) }, (_, i) => {
                                return (
                                    <PaginationItem key={i} onClick={() => {
                                        setPage(i + 1)
                                        table.setPageIndex(i)
                                    }} className="cursor-pointer">
                                        <PaginationLink className={
                                            page === i + 1 ?
                                                `bg-secondary-foreground text-white hover:bg-secondary-foreground hover:text-white`
                                                : ''}>{i + 1}</PaginationLink>
                                    </PaginationItem>
                                )
                            })
                        }
                        <PaginationItem>
                            {
                                table.getCanNextPage() ? <PaginationNext onClick={() => {
                                    if (table.getCanNextPage() || hasNext) {
                                        setPage(page + 1)
                                        table.nextPage()
                                    }
                                }} className="cursor-pointer" /> :
                                    <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pr-2.5 cursor-not-allowed opacity-50">
                                        Next
                                        <ChevronRight className="h-4 w-4" />
                                    </span>
                            }
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            {rowsPerPage} <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {
                            rowsOption.map((option) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={option}
                                        className="capitalize"
                                        checked={rowsPerPageDropDown === option}
                                        onCheckedChange={() => {
                                            table.setPageSize(option)
                                            setRowsPerPage(option)
                                            setRowsPerPageDropDown(option)
                                        }}
                                    >
                                        {option}
                                    </DropdownMenuCheckboxItem>
                                )
                            })
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardFooter>
        </Card>
    </div>
}

export default UsersPage