import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  getUserProfile,
  getStatus,
  selectProfile,
  selectStatus
} from './profileSlice'
import Loader from '../../components/Loader/Loader'
import { Container, Avatar, Typography } from '@material-ui/core'
import { RouteComponentProps } from 'react-router'
import ProfileStatus from './ProfileStatus'
import ProfileDescription from './ProfileDescription'

interface MatchParams {
  userId: string
}
interface Props extends RouteComponentProps<MatchParams> {}

const Profile: FC<Props> = ({ match }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const userId = +match.params.userId
    dispatch(getUserProfile(userId))
    dispatch(getStatus(userId))
  }, [])

  const profile = useAppSelector(selectProfile)
  const status = useAppSelector(selectStatus)

  if (!profile) return <Loader />
  return (
    <Container maxWidth='md'>
      <div>
        <Avatar
          alt={profile.fullName}
          src={
            profile.photos.large ? profile.photos.large : '/broken-image.jpg'
          }
        />
        <Typography variant='h6'>{profile.fullName}</Typography>
        <ProfileStatus status={status} />
        <ProfileDescription profile={profile} />
      </div>
    </Container>
  )
}

export default Profile
