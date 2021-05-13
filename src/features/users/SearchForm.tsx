import { Formik, Form } from 'formik'
import { TextField, Select, MenuItem, Button } from '@material-ui/core'
import React, { FC } from 'react'
import { Filter } from '../../helpers/types/types'
import { useAppSelector } from '../../app/hooks'
import { selectFilter } from './usersSlice'

interface Props {
  onFilterChanged: (filter: Filter) => void
}
interface Values {
  term: string
  friend: FieldFriend
}
type FieldFriend = 'true' | 'false' | 'null'

const SearchForm: FC<Props> = React.memo(({ onFilterChanged }) => {
  const filter = useAppSelector(selectFilter)

  const onSubmit = (values: Values) => {
    const filter: Filter = {
      term: values.term,
      friend: JSON.parse(values.friend)
    }
    onFilterChanged(filter)
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        term: filter.term,
        friend: String(filter.friend) as FieldFriend
      }}
      onSubmit={onSubmit}
    >
      {({ values, handleChange }) => (
        <Form>
          <TextField
            id='term'
            name='term'
            label='Term'
            value={values.term}
            onChange={handleChange}
          />
          <Select name='friend' value={values.friend} onChange={handleChange}>
            <MenuItem value='null'>All</MenuItem>
            <MenuItem value='true'>Only followed</MenuItem>
            <MenuItem value='false'>Only unfollowed</MenuItem>
          </Select>

          <Button color='primary' variant='contained' type='submit'>
            Find
          </Button>
        </Form>
      )}
    </Formik>
  )
})

export default SearchForm
