import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
  const navigate = useNavigate()

  const daysAgoFunction = mongodbTime => {
    const createdAt = new Date(mongodbTime)
    const currentTime = new Date()
    const timeDifference = currentTime - createdAt
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60))
  }

  return (
    <div className="p-4 sm:p-5 rounded-md shadow-xl bg-white border border-gray-100 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <p>{daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
          <Button variant="outline" className="rounded-full" size="icon">
            <Bookmark />
          </Button>
        </div>

        <div className="flex items-center gap-3 my-3">
          <Button className="p-3 sm:p-6" variant="outline" size="icon">
            <Avatar>
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
          </Button>
          <div>
            <h1 className="font-medium text-base sm:text-lg">{job?.company?.name}</h1>
            <p className="text-xs sm:text-sm text-gray-500">India</p>
          </div>
        </div>

        <div>
          <h1 className="font-bold text-lg sm:text-xl my-2 line-clamp-2">{job?.title}</h1>
          <p className="text-sm sm:text-base text-gray-600 line-clamp-3">{job?.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-4">
          <Badge className="text-blue-700 font-bold" variant="ghost">
            {job?.position} Positions
          </Badge>
          <Badge className="text-[#F83002] font-bold" variant="ghost">
            {job?.jobType}
          </Badge>
          <Badge className="text-[#7209b7] font-bold" variant="ghost">
            {job?.salary}LPA
          </Badge>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className="flex-1 min-w-[120px]">
          Details
        </Button>
        <Button className="bg-[#7209b7] flex-1 min-w-[120px]">Save For Later</Button>
      </div>
    </div>
  )
}

export default Job
