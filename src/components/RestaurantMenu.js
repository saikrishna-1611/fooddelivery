import { useEffect, useState } from "react";
import { MENU_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
const RestaurantMenu =  () =>{
    const {resId}=useParams();
    const [resInfo,setresInfo]=useState(null);
    console.log("menu before use effect")
    const fetchMenu = async() =>{
    const value= await fetch(MENU_URL+resId);
    const json= await value.json();
    setresInfo(json.data);
    }
    useEffect(()=>{
        fetchMenu();
        console.log("useeffect of menu is called");
    },[]);
    if(resInfo === null) return <Shimmer/>

    const {name,avgRating,costForTwoMessage,cuisines}=resInfo?.cards[2]?.card?.card?.info;
    const {itemCards}=resInfo?.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card; 
    return (
        <div>
        <h2>{name}</h2>
        <h4>{avgRating}</h4>
        <h4>{cuisines.join(",")}</h4>
        <h4>{costForTwoMessage}</h4>
       <h3>MENU</h3>
            <ul>
                {itemCards.map(item=> <li key={item.card.info.id}>{item.card.info.name} { "  "} Rs:{item.card.info.price/100}</li>)}
            </ul>        
        </div>
        
    )
}

export default RestaurantMenu;