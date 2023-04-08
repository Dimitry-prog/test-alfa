import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { ICard } from "./types/cardTypes";
import { getCards } from "./store/slices/cardSlice";
import Loader from "./components/Loader";
import MemoizedCardList from "./components/CardList";

function App() {
  const {
    cards,
    isLoading,
  } = useAppSelector((state) => state.card);
  const [renderCards, setRenderCards] = useState<ICard[]>([]);
  const [isRenderFavourites, setIsRenderFavourites] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleToggleMeFavouritesCards = () => {
    setIsRenderFavourites(!isRenderFavourites);
  };

  useEffect(() => {
    if (!cards.length) {
      dispatch(getCards());
    }
  }, [cards]);

  useEffect(() => {
    if (isRenderFavourites) {
      setRenderCards(cards.filter(card => card.isLike));
    } else {
      setRenderCards(cards);
    }
  }, [isRenderFavourites, cards]);

  if (isLoading) return <Loader/>;

  return (
    <div className="p-4 flex flex-col gap-4 items-center">
      <button
        onClick={handleToggleMeFavouritesCards}
        type="button"
        aria-label="toggle render cards"
        className="w-fit p-2 border border-black/80 hover:bg-slate-500 hover:text-white transition-all duration-500"
      >
        My Favourites
      </button>
      <MemoizedCardList cards={renderCards} isRenderFavourites={isRenderFavourites}/>
    </div>
  );
}

export default App;
