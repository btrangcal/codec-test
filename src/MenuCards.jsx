
import MenuCard from "./MenuCard";
import card_mapper from "./data/card_mapper";

const MenuCards = ({handleMenuCardClick})=>{
   return(Object.keys(card_mapper).map((name) => (
    <MenuCard
      key={name}
      cardDetails={card_mapper[name]}
      onCardSelect={() => handleMenuCardClick(name)}
      name={card_mapper[name].name}
    />
  ))) 
}

export default MenuCards;