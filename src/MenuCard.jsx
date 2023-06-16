import "./MenuCard.css"
const MenuCard = ({ onCardSelect, name, cardDetails }) => {
    return (
    <div className="menu-card" onClick={() => onCardSelect(cardDetails)}>
        <div className="menu-card-name">{name}</div>
        <div>
            <img src={cardDetails.portrait} alt={name}/>
        </div>
    </div>);
}

export default MenuCard