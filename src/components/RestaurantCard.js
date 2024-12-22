import { CDN_URL } from "../utils/constants";
 const RestaurantCard = (props) => {
    const {resData}=props;
    const { name, cloudinaryImageId, locality, costForTwo, cuisines, avgRating } = resData.info;
  
    return (
      <div className="res-card-div" style={{ backgroundColor: "#f0f0f0" }}>
        <img className="res-logo" src={CDN_URL+cloudinaryImageId} alt={name} />
        <h2 style={{ color: "green" }}>{name}</h2>
        <h4>{locality}</h4>
        <h4>{cuisines.join(",")}</h4> 
        <h4>{costForTwo}</h4>
        <h4>{avgRating}</h4>
      </div>
    );
  };
  export default RestaurantCard;