import { CardGrid } from "./CardGrid"

export const ProjectGridList = ({ data,isLoggedIn,toggleFav }) => {
  return (
    <div className="row g-md-3 g-lg-4 mt-0">
      {(data || []).map((item) => (
        <div className="col col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-3 mt-0" key={item._id}>
          <CardGrid
            item={item}
            toggleFav={toggleFav}
            isLoggedIn={isLoggedIn}
          />
        </div>
      ))}
    </div>
  )
}
