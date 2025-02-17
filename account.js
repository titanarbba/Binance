'use strict'

const { Console } = require('console')
//import Console from 'console';
const WebsocketAPI = require('../../../../src/websocketAPI')
//import WebsocketAPI from '../../../../src/websocketAPI.js';

//('/home/bakar_ahmedou/Documents/insertest')
const suce = require('/home/bakar_ahmedou/Documents/insertest')
//import {insertall} from '/home/bakar_ahmedou/Documents/insertest.js'

const logger = new Console({ stdout: process.stdout, stderr: process.stderr })

const apiKey = process.env.BINANCE_API_KEY || 'Y8FwgbdycZpdAwX14fiS2V2q77BjcdevrpqIBsVBkhtAzdOh9eV1taxUiRZYJKXK'
const apiSecret = process.env.BINANCE_API_SECRET || 'Z4blEwMsgUxKKPVlG4vEH6ncMyulNJBadccdVXzUoHGPi5PIFyuCuI8dqM8sv4Or'

var obj;
var key;
var datacopy;
var key2;


const callbacks = {
  open: (client) => {
    logger.debug('Connected with Websocket server')
    // get account info after connection established
    client.account({ recvWindow: 10000 })
  },
  close: () => logger.debug('Disconnected with Websocket server'),

   
  message: data => {
    //logger.info(data)
     obj = JSON.parse(data)
     //logger.info(obj)
     //logger.info(obj.result.balances)

     for (key in obj.result.balances) {
  
      datacopy = obj.result.balances[key]

      //for (key2 in datacopy)

     //{
    
      if(datacopy.asset == 'USDC')
      {  //logger.info("OK")
        logger.info(datacopy.free)
        suce.insertall(datacopy.free);

       }
   
     //}



     }
  } ,
  





  /*for (const key in obj){
    if(obj.hasOwnProperty(key)){
      console.log(`${key} : ${res[key]}`)
    }
  }*/
  

}


const websocketAPIClient = new WebsocketAPI(apiKey, apiSecret, { logger, callbacks })


 

// disconnect after 20 seconds
setTimeout(() => websocketAPIClient.disconnect(), 20000)
