use strict'

const { Console } = require('console')
const WebsocketAPI = require('../../../../src/websocketAPI')

const logger = new Console({ stdout: process.stdout, stderr: process.stderr })

const apiKey = process.env.BINANCE_API_KEY || 'Y8FwgbdycZpdAwX14fiS2V2q77BjcdevrpqIBsVBkhtAzdOh9eV1taxUiRZYJKXK'
const apiSecret = process.env.BINANCE_API_SECRET || 'Z4blEwMsgUxKKPVlG4vEH6ncMyulNJBadccdVXzUoHGPi5PIFyuCuI8dqM8sv4Or'
const wsURL = 'wss://ws-api.binance.com:443/ws-api/v3' // we setup wsURL to testnet. The default value set to production site: wss://ws-api.binance.com/ws-api/v3

const callbacks = {
  open: (client) => {
    logger.debug('Connected with Websocket server')
    client.newOrder('SCRUSDT', 'SELL', 'MARKET', {
      timeInForce: '',
      //price: 300,
      quantity: 5,
      newClientOrderId: 'my_order_id_1',
      newOrderRespType: 'FULL'
    })
  },
  close: () => logger.debug('Disconnected with Websocket server'),
  message: data => logger.info(data)
}

const websocketAPIClient = new WebsocketAPI(apiKey, apiSecret, { logger, callbacks, wsURL })

// disconnect after 20 seconds
setTimeout(() => websocketAPIClient.disconnect(), 30000)
