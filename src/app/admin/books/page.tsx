// import React from 'react'

// function BooksPage() {
//   return (
//     <div className="flex flex-1 flex-col gap-4 p-4 ">
    
//     </div>
//   )
// }

// export default BooksPage

"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

type BookType={
    title:string,
    author:string,
    genre:string,
    description:string,
    isbn:string,
    publicationYear:number,
    available:boolean
};
const booksData:BookType[] = [
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      description: "A novel about racial injustice and moral growth in the American South.",
      isbn: "9780061120084",
      publicationYear: 1960,
      available: true,
    },
    {
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      description: "A chilling prophecy about the future and a society under totalitarian rule.",
      isbn: "9780451524935",
      publicationYear: 1949,
      available: true,
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      description: "A witty and romantic tale of love, family, and social class.",
      isbn: "9780141040349",
      publicationYear: 1813,
      available: false,
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      description: "A story of the American Dream and the excesses of the Jazz Age.",
      isbn: "9780743273565",
      publicationYear: 1925,
      available: true,
    },
    {
      title: "Moby-Dick",
      author: "Herman Melville",
      genre: "Adventure",
      description: "The quest for vengeance against the white whale, Moby Dick.",
      isbn: "9780142437247",
      publicationYear: 1851,
      available: false,
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      description: "The epic journey of Bilbo Baggins to reclaim treasure guarded by a dragon.",
      isbn: "9780345339683",
      publicationYear: 1937,
      available: true,
    },
    {
      title: "Brave New World",
      author: "Aldous Huxley",
      genre: "Science Fiction",
      description: "A dystopian world dominated by technology and social engineering.",
      isbn: "9780060850524",
      publicationYear: 1932,
      available: true,
    },
    {
      title: "Jane Eyre",
      author: "Charlotte Brontë",
      genre: "Gothic Romance",
      description: "The tale of an orphaned governess and her complicated love life.",
      isbn: "9780141441146",
      publicationYear: 1847,
      available: false,
    },
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "Fiction",
      description: "The experiences of a disillusioned teenager in 1950s New York.",
      isbn: "9780316769488",
      publicationYear: 1951,
      available: true,
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      genre: "Philosophical Fiction",
      description: "A journey of self-discovery and the pursuit of one's dreams.",
      isbn: "9780061122415",
      publicationYear: 1988,
      available: true,
    },
    {
      title: "War and Peace",
      author: "Leo Tolstoy",
      genre: "Historical Fiction",
      description: "A sweeping tale of love, war, and society in Russia during the Napoleonic era.",
      isbn: "9781400079988",
      publicationYear: 1869,
      available: false,
    },
    {
      title: "The Road",
      author: "Cormac McCarthy",
      genre: "Post-apocalyptic Fiction",
      description: "A harrowing journey of survival in a bleak, dystopian world.",
      isbn: "9780307387899",
      publicationYear: 2006,
      available: true,
    },
    {
      title: "The Picture of Dorian Gray",
      author: "Oscar Wilde",
      genre: "Philosophical Fiction",
      description: "A young man's portrait ages instead of him, reflecting his moral decay.",
      isbn: "9780141439570",
      publicationYear: 1890,
      available: true,
    },
    {
      title: "Wutheribetter than words one directionng Heights",
      author: "Emily Brontë",
      genre: "Gothic Fiction",
      description: "A dark tale of love, revenge, and passion on the Yorkshire moors.",
      isbn: "9780141439556",
      publicationYear: 1847,
      available: false,
    },
    {
      title: "Animal Farm",
      author: "George Orwell",
      genre: "Satire",
      description: "An allegorical tale about the corruption of power and the Russian Revolution.",
      isbn: "9780451526342",
      publicationYear: 1945,
      available: true,
    },
  ];
  

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<BookType>[] = [
  {
    id: "select",
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
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "author",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Author
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("author")}</div>,
  },
  {
    accessorKey: "genre",
    header: () => <div className="text-right">Genre</div>,
    cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue("genre")}</div>
    },
  },
  {
    accessorKey: "isbn",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ISBN
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("isbn")}</div>,
  },
  {
    accessorKey: "publicationYear",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Publication Year
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase text-right">{row.getValue("publicationYear")}</div>,
  },
  {
    accessorKey: "available",
    header: "Available",
    cell: ({ row }) => <div className="lowercase">{row.getValue("available")?"true":"false"}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.title)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data:booksData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full p-4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Authors..."
          value={(table.getColumn("author")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("author")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
