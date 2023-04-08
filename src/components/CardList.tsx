import { FC, memo } from "react";
import { ICard } from "../types/cardTypes";
import MemoizedCard from "./Card";

type CardListProps = {
  cards: ICard[];
  isRenderFavourites: boolean;
}

const CardList: FC<CardListProps> = ({cards, isRenderFavourites}) => {

  return (
    <div>
      <ul className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {cards.map((card) => (
          <li key={card.id}>
            <MemoizedCard card={card} isRenderFavourites={isRenderFavourites}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

const areItemsEqual = ({cards: prevCards, isRenderFavourites: prevFavRen}: CardListProps, {
  cards: nextCards,
  isRenderFavourites: nextFavRen
}: CardListProps) => {
  return (JSON.stringify(prevCards) === JSON.stringify(nextCards)) && prevFavRen === nextFavRen;
};

const MemoizedCardList = memo<typeof CardList>(CardList, areItemsEqual);

export default MemoizedCardList;
