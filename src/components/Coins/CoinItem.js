import React from 'react'
import { filter } from 'lodash'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { ReactSVG } from 'react-svg'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import { Favorite } from '@material-ui/icons'
import Divider from '@material-ui/core/Divider'
import CoinTicker from '../Common/CoinTicker'

const styles = (theme) => ({
  avatar: {
    width: '2rem',
    height: '2rem',
    padding: 0,
    verticalAlign: 'middle',
    overflow: 'visible',
    '& svg': {
      width: '2rem',
      height: '2rem',
      padding: 0,
      verticalAlign: 'middle',
      overflow: 'visible'
    }
  },
  column: {
    flexBasis: 0
  }
})

const svgCoinPathHelper = (name) => {
  return require(`../../../node_modules/cryptocurrency-icons/svg/color/${name}.svg`)
    .default
}

const isCoinActiveHelper = (markets) => {
  const activeMarkets = filter(markets, (market) => {
    return market.isActive
  })

  return activeMarkets
}

const CoinItem = ({ classes, coin }) => {
  let coinSymbol = coin.symbol.toLowerCase()
  let svgCoinPath = null
  const isCoinActive = isCoinActiveHelper(coin.markets)

  // if (!isCoinActive.length > 0) {
  //   return null
  // }

  try {
    coinSymbol = coin.symbol.toLowerCase()
    svgCoinPath = svgCoinPathHelper(coinSymbol)
  } catch (err) {
    coinSymbol = 'cc-default'
    svgCoinPath = svgCoinPathHelper('btc')
  }

  return (
    <React.Fragment>
      <ListItem button>
        <ListItemIcon>
          <ReactSVG
            src={svgCoinPath}
            className={classNames(classes.avatar, coinSymbol)}
          />
        </ListItemIcon>
        <ListItemText
          primary={coin.name}
          secondary={coin.symbol.toUpperCase()}
          className={classes.column}
        />
        <ListItemText
          primary={<CoinTicker coin={isCoinActive} />}
          secondary="Live Price"
          className={classes.column}
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="Add cart">
            <Favorite />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <li>
        <Divider />
      </li>
    </React.Fragment>
  )
}

CoinItem.propTypes = {
  classes: PropTypes.object.isRequired,
  coin: PropTypes.object.isRequired
}

export default withStyles(styles)(CoinItem)
