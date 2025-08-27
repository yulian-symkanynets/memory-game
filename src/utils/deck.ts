
export interface CardInterface{
    id: number; 
    emoji: string;
    flipped: boolean;
    matched: boolean;
    onclick: () => void;
}

export const buildDeck = () => {
    const emoji = ['🍎', '🍌', '🍇', '🍓', '🍉', '🍊', '🍍', '🥭'];

    const deck: CardInterface[] = [...emoji, ...emoji].map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false,
        onclick: () => {}
    }));

    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}