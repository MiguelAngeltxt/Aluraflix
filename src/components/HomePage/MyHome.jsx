import React from 'react'
import MyHeader from '../Header/MyHeader'
import MyFooter from '../Footer/MyFooter'
import Banner from './Banner'
import CategoryZone from '../CategoryZone/CategoryZone'
import { useVideoData } from '../../contexts/VideoDataContext'

export default function MyHome() {
  const { loading } = useVideoData()

  if (loading) {
    return <div style={{color:'#fff', textAlign:'center'}}>Cargando videos...</div>
  }

  return (
    <div>
      <MyHeader />
      <Banner />
      <CategoryZone />
      <MyFooter />
    </div>
  )
}
