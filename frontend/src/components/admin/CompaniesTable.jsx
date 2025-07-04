import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company)
  const [filterCompany, setFilterCompany] = useState(companies)
  const navigate = useNavigate()

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter(company => {
        if (!searchCompanyByText) {
          return true
        }
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
      })
    setFilterCompany(filteredCompany)
  }, [companies, searchCompanyByText])

  return (
    <div className="overflow-x-auto rounded-md border border-gray-200 shadow-sm">
      <Table className="min-w-[600px] sm:min-w-full">
        <TableCaption className="text-sm sm:text-base">
          A list of your recent registered companies
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
              Logo
            </TableHead>
            <TableHead className="whitespace-nowrap px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
              Name
            </TableHead>
            <TableHead className="whitespace-nowrap px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
              Date
            </TableHead>
            <TableHead className="text-right px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map(company => (
            <TableRow key={company._id}>
              <TableCell className="whitespace-nowrap px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
                <Avatar>
                  <AvatarImage src={company.logo} />
                </Avatar>
              </TableCell>
              <TableCell className="whitespace-nowrap px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
                {company.name}
              </TableCell>
              <TableCell className="whitespace-nowrap px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
                {company.createdAt.split('T')[0]}
              </TableCell>
              <TableCell className="text-right px-2 py-1 sm:px-4 sm:py-2 cursor-pointer text-xs sm:text-sm">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer hover:text-[#7209b7]"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default CompaniesTable
