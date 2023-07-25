import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react' 

const cryptoApiHeaders ={
    'X-RapidAPI-Key': '2dd8b8eb16msh138a8487d2e8b2ep195df5jsnb97a76b049ae',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl=  'https://coinranking1.p.rapidapi.com'

const createRequest =(url)=>({url, headers:cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath:'cryptoApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>({
        getCryptos: builder.query({
            query:(count)=>createRequest (`/coins?limit=${count}`),
        }),
        getCryptoDetails:builder.query({
            query:(coinuuid)=> createRequest(`/coin/${coinuuid}`),          
        
        }),
       
    })
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery  } = cryptoApi 