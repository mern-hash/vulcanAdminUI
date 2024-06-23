import { CardList } from "./CardList"

export const ProjectCardList = ({ data,isLoggedIn,toggleFav }) => {
  return (
    <div className="row mb-4">
      {(data || []).map((item) => (
        <div className="col col-12 mb-4" key={item._id}>
          <CardList
            item={item}
            isLoggedIn={isLoggedIn}
            toggleFav={toggleFav}
          />
        </div>
      ))}
    </div>
  )
}
