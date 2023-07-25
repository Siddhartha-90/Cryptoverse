 import React, { useEffect } from 'react'
 import millify from 'millify'
 import {Link} from 'react-router-dom'
 import {Card, Row, Col, Input} from 'antd'
 import { useGetCryptosQuery } from '../Services/cryptoApi'
import { useState } from 'react'
 import Loader from './Loader'

 
 const Cryptocurrencies = ({simplified}) => {
    const count= simplified ? 10:100
    const {data:cryptoList, isFetching} =useGetCryptosQuery(count)
    const [cryptos, setCryptos]= useState(cryptoList?.data?.coins)
    // const [SearchTerm , setSearchTerm]=useState('')

    // useEffect(()=>{
    //      const filteredData=cryptoList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(SearchTerm.toLowerCase))
    //    setCryptos(filteredData)
    // } , [cryptoList, SearchTerm])
    if(isFetching) return <Loader/>

   return (
     <>
      <div className='search-crypto'>
        {/* <Input placeholder='Search Crypto Currency' onChange={ (e)=> setSearchTerm(e.target.value)}/>  */}

      </div>
      <Row gutter={[32,32]} className='crypto-card-container'>
         {cryptos?.map((currency)=>(
          <Col xs={24} sm={12} lg={8} className='crypto-card' key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card title={`${currency.rank}. ${currency.name}`}
              extra={<img className='crypto-image' src={currency.iconUrl}/>}
              hoverable              
              >
                <p>Price:{millify(currency.price)}</p>
                <p>Market Cap:{millify(currency.marketCap)}</p>
                <p>Daily Change:{millify(currency.change)}%</p>
              </Card>
            </Link>

          </Col>



         ))}

      </Row>
     </>
   )
 }
 
 export default Cryptocurrencies