import listings from './data'
export default function Page() {
  return (
    <>
      {
        listings.map(listing => (
          <div key={listing.id}>
            <h1>{listing.title}</h1>
            <p>{listing.description}</p>
            <p>{listing.price}</p>
            <p>{listing.location}</p>
            <img src={listing.image} alt={listing.title} />
            <a href={`/listings/${listing.id - 1}`}>See More</a>
            <hr />
          </div>
        ))
      }
    </>
  )
}