function List_Emoij() {
  let list = [];
  list.push(String.fromCodePoint(128077));
  list.push(String.fromCodePoint(128078));
  list.push(String.fromCodePoint(128150));
  list.push(String.fromCodePoint(128148));
  list.push(String.fromCodePoint(128405));
  for (let i = 128512; i <= 128567; i++) {
    list.push(String.fromCodePoint(i));
  }
  return list;
}

export default function Emoji(props) {
  const list = List_Emoij();

  const emojis = list.map((emoji) => (
    <p key={emoji} className="text-xl cursor-pointer rounded-md p-1 transition-colors duration-200 ease-in-out hover:bg-gray-300" onClick={() => props.SendEmoji(emoji)}>
      {emoji}
    </p>
  ));

  return (
    <div className="flex flex-row bg-white shadow-lg z-10 select-none absolute right-1 top-[29px] justify-start overflow-auto flex-wrap items-center rounded-xl border w-52 h-48 p-2">
      {emojis}
    </div>
  );
}
