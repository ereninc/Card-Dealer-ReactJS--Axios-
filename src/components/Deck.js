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

  function animateCard() {
    let angle = Math.random() * 90 - 45;
    let xPos = Math.random() * 40 - 20;
    let yPos = Math.random() * 40 - 20;
    let transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
    return transform;
  }

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
      card.transform = animateCard();
      setDrawn((d) => [
        ...d,
        {
          id: card.code,
          image: card.image,
          name: `${card.value} of ${card.suit}`,
          transform: card.transform,
        },
      ]);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <h1 className="Deck-title">⩤ Card Dealer ⩥</h1>
      <h2 className="Deck-title subtitle">⩤ Pick a Card! ⩥</h2>
      <button
        className="Deck-btn Get-Card"
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
            <Card
              key={c.id}
              name={c.name}
              image={c.image}
              transform={c.transform}
            />
          ))
        }
      </div>
    </div>
  );
}
