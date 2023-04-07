import CardList from "./components/CardList";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { ICard } from "./types/cardTypes";
import { getCards } from "./store/slices/cardSlice";
import Loader from "./components/Loader";

function App() {
  const {
    cards: fetchedCards,
    favourites,
    isLoading,
  } = useAppSelector((state) => state.card);
  const [renderCards, setRenderCards] = useState<ICard[]>([]);
  const [isRenderFavourites, setIsRenderFavourites] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  console.log('fetchedCards', fetchedCards)
  console.log('renderCards', renderCards)
  const handleToggleRenderCards = () => {
    setIsRenderFavourites(!isRenderFavourites);
    if (isRenderFavourites) {
      setRenderCards(favourites);
    } else {
      setRenderCards(fetchedCards);
    }
  };

  useEffect(() => {
    if (!fetchedCards.length) {
      dispatch(getCards());
    }
    setRenderCards(fetchedCards);
  }, [fetchedCards]);

  if (isLoading) return <Loader/>;

  return (
    <div className="p-4 flex flex-col gap-4 items-center">
      <button
        onClick={handleToggleRenderCards}
        type="button"
        aria-label="toggle render cards"
        className="w-[150px] p-2 border border-black/80 hover:bg-slate-500 hover:text-white transition-all duration-500"
      >
        My Favourites
      </button>
      <CardList cards={renderCards}/>
    </div>
  );
}

export default App;
