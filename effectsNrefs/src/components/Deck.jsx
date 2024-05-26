import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

function Deck() {
  const [card, setCard] = useState([]);
  const [deck, setDeck] = useState();

  const DECK_URL = "https://deckofcardsapi.com/api/deck";

  // shuffle deck
  const shuffleDeck = async () => {
    await axios.get(`${DECK_URL}/${deck}/shuffle/`);
    setCard([]);
  };
  // get new card from deck
  const getNewCard = async () => {
    const cardType = await axios.get(`${DECK_URL}/${deck}/draw/?count=1`);
    setCard((card) => [
      ...card,
      {
        id: cardType.data.cards[0].code,
        name: cardType.data.cards[0].suit + " " + cardType.data.cards[0].value,
        image: cardType.data.cards[0].image,
      },
    ]);
  };

  //   get new deck once at the start of game
  useEffect(() => {
    const fetchDeck = async () => {
      const deckId = await axios.get(`${DECK_URL}/new/shuffle/?deck_count=1`);
      setDeck(deckId.data.deck_id);
    };
    fetchDeck();
  }, []);

  return (
    <>
      <button onClick={shuffleDeck}>New Deck</button>
      <button onClick={getNewCard}>Draw Card</button>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {card.map((c) => (
          <Card key={c.id} image={c.image} name={c.name} />
        ))}
      </div>
    </>
  );
}

export default Deck;
