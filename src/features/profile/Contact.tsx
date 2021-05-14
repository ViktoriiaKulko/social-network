import { FC } from 'react'
import { Link } from 'react-router-dom'
import SvgIcon from '@material-ui/core/SvgIcon'

interface Props {
  value: string
}

const Contact: FC<Props> = ({ value, children }) => {
  return (
    <Link to={value}>
      <SvgIcon color='primary'>{children}</SvgIcon>
    </Link>
  )
}

export default Contact
