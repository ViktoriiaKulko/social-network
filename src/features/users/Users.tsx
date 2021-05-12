import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectCurrentPage,
  selectPagesNumber,
  selectPageSize,
  selectFilter,
  selectUsers,
  selectIsFetching,
  requestUsers,
  toggleUserFollowing
} from './usersSlice'
import * as queryString from 'querystring'
import User from './User'
import { Container, Grid, makeStyles } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import SearchForm from './SearchForm'
import { Filter } from '../../helpers/types/types'
import Loader from '../../components/Loader/Loader'

interface QueryParams extends queryString.ParsedUrlQueryInput {
  term?: string
  page?: string
  friend?: string
}

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: '80px 1fr 80px',
    '& > div': {
      alignSelf: 'start'
    }
  },
  ul: {
    '& > ul': {
      justifyContent: 'center'
    }
  }
}))

const Users = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const history = useHistory()

  const pagesNumber = useAppSelector(selectPagesNumber)
  const currentPage = useAppSelector(selectCurrentPage)
  const pageSize = useAppSelector(selectPageSize)
  const filter = useAppSelector(selectFilter)
  const users = useAppSelector(selectUsers)
  const isFetching = useAppSelector(selectIsFetching)

  useEffect(() => {
    const parsedSearch = queryString.parse(
      history.location.search.substr(1)
    ) as QueryParams

    let actualPage = currentPage
    let actualFilter = filter

    if (parsedSearch.page) {
      actualPage = +parsedSearch.page
    }
    if (parsedSearch.term) {
      actualFilter = { ...actualFilter, term: parsedSearch.term as string }
    }
    if (parsedSearch.friend) {
      actualFilter = {
        ...actualFilter,
        friend: JSON.parse(parsedSearch.friend)
      }
    }
    dispatch(requestUsers(actualPage, pageSize, actualFilter))
  }, [])

  useEffect(() => {
    const query: QueryParams = {}
    if (!!filter.term) query.term = filter.term
    if (filter.friend !== null) query.friend = String(filter.friend)
    if (currentPage !== 1) query.page = String(currentPage)

    history.push({
      pathname: '/users',
      search: queryString.stringify(query)
    })
  }, [filter, currentPage])

  const onPageChanged = (event: Object, pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter))
  }

  const toggleFollowing = (userId: number) => {
    dispatch(toggleUserFollowing(userId))
  }

  const onFilterChanged = (filter: Filter) => {
    dispatch(requestUsers(1, pageSize, filter))
  }

  if (isFetching) return <Loader />

  return (
    <Container className={classes.container} maxWidth='md'>
      <SearchForm onFilterChanged={onFilterChanged} />

      <Grid container spacing={4}>
        {users.map((user) => (
          <Grid item key={user.id} xs={12} sm={6} md={4}>
            <User user={user} toggleFollowing={toggleFollowing} />
          </Grid>
        ))}
      </Grid>

      <Pagination
        className={classes.ul}
        count={pagesNumber}
        page={currentPage}
        color='primary'
        shape='rounded'
        onChange={onPageChanged}
      />
    </Container>
  )
}

export default Users
