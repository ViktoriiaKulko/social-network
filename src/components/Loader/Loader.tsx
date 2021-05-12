import { CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

const Loader = () => {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
      <CircularProgress />
    </div>
  )
}

export default Loader
