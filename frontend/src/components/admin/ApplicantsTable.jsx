import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'

const shortlistingStatus = ['Accepted', 'Rejected']

const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application)

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status })
      if (res.data.success) {
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating status')
    }
  }

  return (
    <div className="overflow-x-auto rounded-md border border-gray-200 shadow-sm">
      <Table className="min-w-[600px] sm:min-w-full">
        <TableCaption className="text-sm sm:text-base">
          A list of your recent applied user
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">FullName</TableHead>
            <TableHead className="whitespace-nowrap px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Email</TableHead>
            <TableHead className="whitespace-nowrap px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Contact</TableHead>
            <TableHead className="whitespace-nowrap px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Resume</TableHead>
            <TableHead className="whitespace-nowrap px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Date</TableHead>
            <TableHead className="text-right px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map(item => (
              <TableRow key={item._id}>
                <TableCell className="whitespace-nowrap px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
                  {item?.applicant?.fullname}
                </TableCell>
                <TableCell className="whitespace-nowrap px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
                  {item?.applicant?.email}
                </TableCell>
                <TableCell className="whitespace-nowrap px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
                  {item?.applicant?.phoneNumber}
                </TableCell>
                <TableCell className="whitespace-nowrap px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 hover:underline"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell className="whitespace-nowrap px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
                  {item?.applicant?.createdAt?.split('T')[0]}
                </TableCell>
                <TableCell className="text-right px-2 py-1 sm:px-4 sm:py-2 cursor-pointer text-xs sm:text-sm">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          onClick={() => statusHandler(status, item?._id)}
                          key={index}
                          className="flex w-fit items-center my-2 cursor-pointer hover:text-[#7209b7]"
                        >
                          <span>{status}</span>
                        </div>
                      ))}
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

export default ApplicantsTable
