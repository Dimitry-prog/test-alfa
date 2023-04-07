import { FC } from "react";
import { ICard } from "../types/cardTypes";
import { BsTrashFill } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type CardProps = {
  card: ICard;
};

const Card: FC<CardProps> = ({ card }) => {
  const { imgUrl, description } = card;

  return (
    <div className="h-full relative flex flex-col justify-between shadow-md hover:scale-105 transition-all duration-500 group overflow-hidden">
      <img
        src={imgUrl}
        alt={description}
        className="w-full h-48 object-cover"
      />
      <p className="p-2 text-base no-underline">{description}</p>

      <div className="w-full absolute -bottom-24 left-0 flex items-center justify-between bg-slate-500/20 group-hover:-bottom-0 duration-500">
        <button type="button" aria-label="Like" className="p-1">
          <AiFillHeart /> <AiOutlineHeart />
        </button>
        <button type="button" aria-label="Delete">
          <BsTrashFill />
        </button>
      </div>
    </div>
  );
};

export default Card;
