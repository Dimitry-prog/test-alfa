import { FC, memo } from "react";
import { ICard } from "../types/cardTypes";
import { BsTrashFill } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { deleteCard, toggleLikeCard } from "../store/slices/cardSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

type CardProps = {
  card: ICard;
  isRenderFavourites: boolean;
};

const Card: FC<CardProps> = ({card, isRenderFavourites}) => {
  const {id, imgUrl, description} = card;
  const cards = useAppSelector(state => state.card.cards);
  const dispatch = useAppDispatch();
  const isLikeCard = cards.find(card => card.id === id && card.isLike);

  return (
    <div
      className="h-full relative flex flex-col justify-between shadow-md hover:scale-105 transition-all duration-500 group overflow-hidden">
      <img
        src={imgUrl}
        alt={description}
        className="w-full h-48 object-cover"
      />
      <p className="p-2 text-base font-medium text-center">{description}</p>

      <div
        className={`w-full p-2 absolute -bottom-24 left-0 flex items-center bg-slate-500/20 group-hover:-bottom-0 duration-500 ${isRenderFavourites ? 'justify-center' : 'justify-between'}`}>
        <button
          onClick={() => dispatch(toggleLikeCard(id))}
          type="button"
          aria-label="Toggle Like"
        >
          {isLikeCard ? (
            <AiFillHeart className="w-8 h-8 text-red-600"/>
          ) : (
            <AiOutlineHeart className="w-8 h-8"/>
          )}
        </button>
        {!isRenderFavourites && (<button
          onClick={() => dispatch(deleteCard(id))}
          type="button"
          aria-label="Delete"
        >
          <BsTrashFill className="w-8 h-8"/>
        </button>)}
      </div>
    </div>
  );
};

const areItemsEqual = ({card: prevCard, isRenderFavourites: prevFavRen}: CardProps, {
  card: nextCard,
  isRenderFavourites: nextFavRen
}: CardProps) => {
  return Object.keys(prevCard).every(key => {
    return prevCard[key as keyof ICard] === nextCard[key as keyof ICard];
  }) && prevFavRen === nextFavRen;
};

const MemoizedCard = memo<typeof Card>(Card, areItemsEqual);

export default MemoizedCard;
