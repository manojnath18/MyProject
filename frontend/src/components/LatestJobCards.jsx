import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-4 sm:p-5 rounded-xl shadow-md bg-white border border-gray-100 cursor-pointer hover:shadow-lg transition-all duration-200 ease-in-out"
    >
      <div className="mb-2">
        <h1 className="font-semibold text-md sm:text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>

      <div className="my-2 space-y-1">
        <h1 className="font-bold text-md sm:text-lg">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  )
}

export default LatestJobCards
