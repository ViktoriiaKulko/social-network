import { FC } from 'react'
import { Profile, Contacts } from '../../helpers/types/types'
import Contact from './Contact'
import {
  GitHub,
  Facebook,
  Instagram,
  YouTube,
  Twitter,
  Portrait
} from '@material-ui/icons'

interface Props {
  profile: Profile
}

const contacts = [
  'github',
  'facebook',
  'instagram',
  'youtube',
  'twitter',
  'website'
]

const ProfileDescription: FC<Props> = ({ profile }) => {
  return (
    <div>
      <div>Looking for a job: {profile.lookingForAJob ? 'yes' : 'no'}</div>
      <div>Professional preferences: {profile.lookingForAJobDescription}</div>
      <div>About me: {profile.aboutMe}</div>
      <div>
        {Object.entries(profile.contacts)
          .filter(([key, value]) => contacts.includes(key) && value)
          .map(([key, value]) => (
            <Contact key={key} value={value}>
              {key === 'github' && <GitHub />}
              {key === 'facebook' && <Facebook />}
              {key === 'instagram' && <Instagram />}
              {key === 'youtube' && <YouTube />}
              {key === 'twitter' && <Twitter />}
              {key === 'website' && <Portrait />}
            </Contact>
          ))}
      </div>
    </div>
  )
}

export default ProfileDescription
