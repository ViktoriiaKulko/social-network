import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { User as UserTypes } from '../../helpers/types/types'
import { makeStyles, Avatar, Button, Typography } from '@material-ui/core'
import indigo from '@material-ui/core/colors/indigo'

interface Props {
  user: UserTypes
  toggleFollowing: (userId: number) => void
}

const useStyles = makeStyles(() => ({
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover > div': {
      backgroundColor: indigo[300]
    }
  },
  avatar: {
    width: '80px',
    height: '80px',
    border: '2px solid transparent',
    transition: 'background-color .3s',
    boxSizing: 'border-box',
    margin: '0 auto 8px'
  },
  button: {
    display: 'block',
    margin: '8px auto 0'
  }
}))

const User: FC<Props> = ({ user, toggleFollowing }) => {
  const classes = useStyles()

  return (
    <div>
      <NavLink className={classes.link} to={'/profile/' + user.id}>
        <Avatar
          className={classes.avatar}
          alt={user.name}
          src={user.photos.small ? user.photos.small : '/broken-image.jpg'}
        />
        <Typography variant='subtitle1' align='center'>
          {user.name}
        </Typography>
      </NavLink>
      <Button
        className={classes.button}
        disabled={user.isFollowingProgress}
        color='primary'
        size='small'
        onClick={() => toggleFollowing(user.id)}
      >
        {user.followed ? 'Unfollow' : 'Follow'}
      </Button>
    </div>
  )
}

export default User
