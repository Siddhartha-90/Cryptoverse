import React, { useState } from 'react'
import {Select,Typography, Row, Col, Avatar, Card} from 'antd'
import moment from 'moment'
import {useGetCryptoNewsQuery} from '../Services/cryptoNewsApi'
import {useGetCryptosQuery} from '../Services/cryptoApi' 
import Loader from './Loader'
const {Text, Title}= Typography
const {Option} = Select
const demoImage='http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'
const News = ({simplified}) => {
  const[newsCategory,setNewsCategory]=useState('Cryptocurrency')

  const {data:cryptoNews}=useGetCryptoNewsQuery({newsCategory , count: simplified ? 6 : 12 })
  const {data} =useGetCryptosQuery(100)

  if(!cryptoNews?.value) return <Loader/>
  return (

    <Row gutter={[24,24]}>
    {!simplified &&(
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder='Select a Crypto'
            optionFilterProp='items'
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input,option)=>option.items.toLowerCase().indexOf(input.toLowerCase())>=0}          
          
          >
            <Option value='Cryptocurrency'></Option> 
              {data?.data?.coins.map((coin)=><Option value={coin.name}>{coin.name}</Option>)}
            
          </Select>
        </Col>
      )} 

      {cryptoNews.value.map((news,i)=>(
        <Col xs={24} sm={12} lg={12} key={i}>
          <Card hoverable className='news-card'>
            <a href={news.url} target='_blank' rel='noreferr'>
              <div className='news-image-container'>
                  <Title className='news-title' level={4}>{news.name}</Title>
                 
                 <img style={{maxHeight:'100px', maxWidth:'200px'}} src={news?.image?.thumbnail?.contentUrl|| demoImage} alt='News'/>
                </div>
                    
                <p>
                  {news.description>100? `${news.description.substring(0,100)}....`:
                  news.description}
                </p> 
                <div className='provider-container'>
                  <div>
                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl} alt='News'/>
                    <Text className='provider-name'>{news.provider[0]?.name}</Text>
                  </div>
                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                </div>
              
            </a>
          </Card>
        </Col>

      ))}
      
       </Row>
  )
}

export default News