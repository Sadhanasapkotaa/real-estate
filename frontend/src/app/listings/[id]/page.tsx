"use client"
import { redirect, useParams } from 'next/navigation'
import listings from '../data'
export default function Page() {
  const params = useParams()
  const listing = listings[Number(params.id)]
  return (
    <>
      {listing ? (
       <div key={listing.id}>
            <h1>{listing.title}</h1>
            <p>{listing.description}</p>
            <p>{listing.price}</p>
            <p>{listing.location}</p>
            <img src={listing.image} alt={listing.title} />
        </div>
      ): (
        redirect('/404')
      )}
       
    </>
  )
}