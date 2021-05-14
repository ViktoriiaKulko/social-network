import { FC } from 'react'

interface Props {
  status: string
}

const ProfileStatus: FC<Props> = ({ status }) => {
  return <div>{status}</div>
}

export default ProfileStatus
