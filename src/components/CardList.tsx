import { FC } from "react";
import Card from "./Card";
import { ICard } from "../types/cardTypes";

type CardListProps = {
  cards: ICard[];
}

const CardList: FC<CardListProps> = ({cards}) => {

  return (
    <div>
      <ul className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {cards.map((card) => (
          <li key={card.id}>
            <Card card={card}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardList;
