import { useLazyQuery } from '@apollo/client'
import React, { Fragment, useEffect } from 'react'
import { REFRESH_BTCZAR_LIVE_PRICE } from '../constants'
import { GET_PAIR } from '../graphql/queries'

const BitcoinRandLivePrice: React.FC = () => {
  const [getLivePrice, { data }] = useLazyQuery(GET_PAIR, {
    fetchPolicy: 'cache-and-network',
    variables: {
      pair: 'XBTZAR'
    }
  })

  useEffect(() => {
    getLivePrice()

    const intervalBtcPrice = setInterval(
      () => getLivePrice(),
      REFRESH_BTCZAR_LIVE_PRICE
    )

    return () => {
      window.clearInterval(intervalBtcPrice)
    }
  }, [getLivePrice])

  // eslint-disable-next-line no-console
  console.info('bitcoinRandPrice', data && data.pair && data.pair.last_trade)

  return <Fragment />
}

export default BitcoinRandLivePrice
