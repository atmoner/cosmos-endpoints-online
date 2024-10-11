import { assets, chains } from 'chain-registry'
import fetch from 'node-fetch'
import fs from 'fs'

var finalData = []

  async function getLcd(chain) {
    let finder = chains.find(
      ({chain_name}) => chain_name === chain
    ) 
    let finalLcd = ''
    
    if (typeof finder !== 'undefined' && typeof finder.apis !== 'undefined') {      
      for (const lcds of finder.apis.rest) {      
        try {
          const response = await fetch(lcds.address + '/node_info')
          if (response.status == 200) {
            finalLcd = lcds.address
            break
          } 
        } catch (err) {
          console.error(err)
        }        
      }      
    }
    return finalLcd
  }
  async function getRpc(chain) {
    let finder = chains.find(
      ({chain_name}) => chain_name === chain
    ) 
    let finalRpc = ''
    
    if (typeof finder !== 'undefined' && typeof finder.apis !== 'undefined') {   
      for (const rpcs of finder.apis.rpc) {      
        try {
          const response = await fetch(rpcs.address)
          if (response.status == 200) {
            finalRpc = rpcs.address
            break
          } 
        } catch (err) {
          console.error(err)
        }        
      }      
    }
    return finalRpc
  }


  var content = ''
  var datetime = new Date();
  content += `Last update: ` + datetime + `
  `
  var chainsToCheck = ['cosmoshub', 'bitcanna', 'osmosis', 'desmos', 'chihuahua', 'juno', 'stargaze', 'akash', 'axelar', 'kichain', 'kujira', 'meme', 'passage', 'persistence', 'secretnetwork', 'gravitybridge', 'emoney', 'dig', 'bitsong', 'cheqd']
  chainsToCheck.forEach(async function(item) {  
    
    const assetList = assets.find(({chain_name}) => chain_name === item) 
    
    var lcd = await getLcd(item)
    var rpc = await getRpc(item)
    content += `### <img alt="`+item+`" src="`+assetList.assets[0].logo_URIs.png+`" width="30" height="30"> ` + item + `
`
    content += `&emsp; LCD :green_circle: ` + lcd + `  
`
    content += `&emsp; RPC :green_circle: ` + rpc + `  
`
    fs.writeFileSync("README.md", content)     
  })   
