import { useQuery } from '@apollo/client'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme } from '@material-ui/core/styles'
import React from 'react'
import { GET_COUNT } from '../graphql/queries'

const SimpleAppBar: React.FC = () => {
  const classes = useStyles()
  const { data } = useQuery(GET_COUNT)

  return (
    <AppBar color="secondary" className={classes.root}>
      <Typography variant="body1" color="inherit" align="right">
        {data &&
          data.count &&
          data.count.map(
            (count: { name: string; count: number }, ix: number) => (
              <span key={`${count}${ix}`}>
                {count.name}: {count.count} -{' '}
              </span>
            )
          )}{' '}
        Support - &copy; Altcash {new Date().getFullYear()}
      </Typography>
    </AppBar>
  )
}

export default SimpleAppBar

const useStyles = makeStyles(({ breakpoints, typography, spacing }: Theme) => ({
  root: {
    zIndex: 1,
    boxShadow: 'none',
    padding: '.5rem 1.5rem',
    top: 'auto',
    bottom: 0,
    position: 'fixed',
    [breakpoints.up('xl')]: {
      position: 'absolute',
      borderRadius: '.5rem .5rem 0 0'
    }
  }
}))
