import React from "react";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../helpers/API";
import Card from "./Card";
import "../styles/Deck.css";

export default function Deck() {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);

  React.useEffect(() => {
    async function getDeck() {
      let deck = await axios.get(`${API_URL}/new/shuffle/`);
      setDeck(deck.data);
    }
    getDeck();
  }, [setDeck]);

  const getCard = async () => {
    //make request using deck id
    //set state using new card info from api
    let id = deck.deck_id;
    try {
      let cardUrl = `${API_URL}/${id}/draw/`;
      let cardRes = await axios.get(cardUrl);
      if (!cardRes.data.success) {
        throw new Error("No card remaining!");
      }
      let card = cardRes.data.cards[0];
      setDrawn((d) => [
        ...d,
        {
          id: card.code,
          image: card.image,
          name: `${card.value} of ${card.suit}`,
        },
      ]);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <h1>Card Dealer</h1>
      <button
        onClick={() => {
          getCard();
        }}
      >
        Get Card!
      </button>
      <div className="Deck-cardarea">
        {
          // map over drawn cards and make a card for each one
          drawn.map((c) => (
            <Card key={c.id} name={c.name} image={c.image} />
          ))
        }
      </div>
    </div>
  );
}
