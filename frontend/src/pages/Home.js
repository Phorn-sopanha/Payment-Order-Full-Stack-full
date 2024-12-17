import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizonCardProduct from '../components/HorizonCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      
      <BannerProduct />
      <CategoryList />

      <HorizonCardProduct category = {"airpodes"} heading={"Top's Airpodes"}/>
      <HorizonCardProduct category = {"watches"} heading={"Popular's Earphones"}/>


      <VerticalCardProduct category = {"mobiles"} heading={"Mobile"}/>
      <VerticalCardProduct category = {"earphones"} heading={"Watches"}/>
      <VerticalCardProduct category = {"Mouse"} heading={"Mouse"}/>
      <VerticalCardProduct category = {"televisions"} heading={"Televisions"}/>
      <VerticalCardProduct category = {"camera"} heading={"Camera & tripod"}/>
      <VerticalCardProduct category = {"speakers"} heading={"Bluetooth Speakers"}/>
      <VerticalCardProduct category = {"refrigerator"} heading={"Refrigerator"}/>
      <VerticalCardProduct category = {"trimmers"} heading={"Trimmers"}/>
      <VerticalCardProduct category = {"processor"} heading={"Processor & Computer"}/>
      <VerticalCardProduct category = {"printers"} heading={"Printers"}/>

    </div>
  )
}

export default Home
