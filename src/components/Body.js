import  RestaurantCard from "./RestaurantCard";
// import restaurants from "../utils/rawData";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
const Body = () => {
  
    const [Restaurants,setRestaurants]=useState([]);           //state list 
    const [FilteredRes,setFilteredRes]=useState([]);
    const [searchText,setsearchText]=useState("");
    console.log("rendered");
    const filterByCusine=(cusine)=>{                           //whole restaurants will get filtered on each cusine
      const filteredList=Restaurants.filter((res)=>
      res.info.cuisines && res.info.cuisines.includes(cusine));
      setFilteredRes(filteredList);
  }
   const filterbyRating=()=>{                                 //that item rating will be filtered
      const filteredList=FilteredRes.filter((res)=>
          res.info.avgRating>4
      );
      setFilteredRes(filteredList);
  }
  const allrestaurants=()=>{
      setFilteredRes(Restaurants);
  }
const fetchData = async () => {
  try {
    const api = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4568224&lng=78.6577882&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
    const json = await api.json();
    const fetchedRes = json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    if (fetchedRes) {
      setRestaurants(fetchedRes);
      setFilteredRes(fetchedRes);
    } else {
      setRestaurants([]);
      setFilteredRes([]);
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
    setRestaurants([]);
    setFilteredRes([]);
  }
};
 useEffect(() => {
  fetchData();
}, []); // Dependency array to run fetchData only once


  
    return Restaurants.length === 0?<Shimmer/>:(
      <div className="body-div">
       <div className="nav-items-filter">
         <div>
          <input type="text" value={searchText} onChange={(e)=>{
          setsearchText(e.target.value);
          }}/>
          <button onClick={()=>{
            const searchList=Restaurants.filter((res)=>res.info.name.toLowerCase().includes(searchText.toLowerCase()));
            setFilteredRes(searchList);
          }
          }>search</button>
         </div>
         <button className="allrestaurant" onClick={()=>allrestaurants()}>All</button>
         <button className="button" onClick={()=>filterbyRating()}>Top Rated</button>
         <button className="biryani" onClick={()=>filterByCusine("Biryani")}>Biryani</button>
         <button className="burger" onClick={()=>filterByCusine("Burgers")}>Burger</button>
         <button className="pizza" onClick={()=>filterByCusine("Pizzas")}>Pizzas</button>
         <button className="dessert" onClick={()=>filterByCusine("Desserts")}>Desserts</button>
         <button className="beverages" onClick={()=>filterByCusine("Beverages")}>Beverages</button>
         <button className="icecream" onClick={()=>filterByCusine("Ice Cream")}>Icecream</button>
       </div>
       <div className="restaurant-container">
          {
          FilteredRes.map((restaurant) => (
            <Link key={restaurant.info.id} to={"/restaurants/"+restaurant.info.id}><RestaurantCard resData={restaurant} /></Link>
          ))
          }
        </div>
      </div>
    );
  };

  export default Body;