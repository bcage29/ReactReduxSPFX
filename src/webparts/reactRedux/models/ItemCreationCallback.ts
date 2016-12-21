// functions passed as props in typescript need to have a function signature
// using an Alias type or interface will do the trick

// type ItemCreationCallback = (inputValue: string) => void;

interface ItemCreationCallback { (inputValue: string): void; }

export default ItemCreationCallback;