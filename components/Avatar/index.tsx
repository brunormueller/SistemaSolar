import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const getContrastColor = (hexColor: any) => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? "#000" : "#fff";
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Avatar = ({ nome_responsavel }: any) => {
  const randomBackgroundColor = getRandomColor();
  const textColor = getContrastColor(randomBackgroundColor);

  return (
    <>
      <HoverCard>
        <HoverCardTrigger>
          <span
            className={`w-8 h-8 font-medium cursor-pointer p-2 rounded-full text-xs`}
            style={{ backgroundColor: randomBackgroundColor, color: textColor }}
          >
            {nome_responsavel.substring(0, 2).toUpperCase()}
          </span>
        </HoverCardTrigger>
        <HoverCardContent className="text-center text-base px-1 py-2">
          {nome_responsavel}
        </HoverCardContent>
      </HoverCard>
    </>
  );
};

export default Avatar;
