import { FC } from "react";
import { ICard } from "../types/cardTypes";
import { BsTrashFill } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteCard, toggleLikeCard } from "../store/slices/cardSlice";
import { useAppSelector } from "../hooks";

type CardProps = {
  card: ICard;
};

const Card: FC<CardProps> = ({card}) => {
  const {id, imgUrl, description} = card;
  const favourites = useAppSelector((state) => state.card.favourites);
  const dispatch = useDispatch();
  const isFavouriteCard = favourites.some((card) => card.id === id);

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
        className="w-full p-2 absolute -bottom-24 left-0 flex items-center justify-between bg-slate-500/20 group-hover:-bottom-0 duration-500">
        <button
          onClick={() => dispatch(toggleLikeCard(card))}
          type="button"
          aria-label="Toggle Like"
        >
          {isFavouriteCard ? (
            <AiFillHeart className="w-8 h-8 text-red-600"/>
          ) : (
            <AiOutlineHeart className="w-8 h-8"/>
          )}
        </button>
        <button
          onClick={() => dispatch(deleteCard(id))}
          type="button"
          aria-label="Delete"
        >
          <BsTrashFill className="w-8 h-8"/>
        </button>
      </div>
    </div>
  );
};

export default Card;
