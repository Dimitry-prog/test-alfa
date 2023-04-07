import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getCards } from "../store/slices/cardSlice";
import Card from "./Card";

type CardListProps = {
  isOpen: boolean;
};

const CardList: FC<CardListProps> = ({ isOpen }) => {
  const cards = useAppSelector((state) => state.card.cards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCards());
  }, []);

  return (
    <div>
      <ul className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {cards.map((card) => (
          <li key={card.id}>
            <Card card={card} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardList;
