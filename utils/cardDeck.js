// utils/cardDeck.js
export function generateDeck() {
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const ranks = [
        "A", "2", "3", "4", "5", "6", "7", "8", "9", "10",
        "J", "Q", "K"
    ];

    const deck = [];

    suits.forEach((suit) => {
        ranks.forEach((rank) => {
            deck.push({
                id: `${rank}-${suit}`,
                rank,
                suit,
                img: `/images/cards/${rank}_of_${suit}.png` // personalize here
            });
        });
    });

    // Add jokers
    deck.push({ id: "joker-red", rank: "Joker", suit: "red", img: "/images/cards/joker_red.png" });
    deck.push({ id: "joker-black", rank: "Joker", suit: "black", img: "/images/cards/joker_black.png" });

    return deck;
}
