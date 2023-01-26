import Feels from "./Icons/Feels";
import Wind from "./Icons/Wind";
import Humidity from "./Icons/Humidity";
import Visibility from "./Icons/Visibility";
import Pressure from "./Icons/Pressure";
import Pop from "./Icons/Pop";

type Props = {
  icon: "wind" | "feels" | "humidity" | "visibility" | "pressure" | "pop";
  title: string;
  info: string | JSX.Element;
  description: string;
};

const icons = {
  wind: Wind,
  feels: Feels,
  humidity: Humidity,
  visibility: Visibility,
  pressure: Pressure,
  pop: Pop,
};

const InfoBox = ({ icon, title, info, description }: Props): JSX.Element => {
  const Icon = icons[icon];
  return (
    <article className="w-[140px] h-[130px] text-zinc-700 bg-white/30 backdrop-blur-ls rounded drop-shadow-lg p-2 mb-5 flex flex-col justify-between text-center">
      <div className="flex justify-center items-center text-sm font-bold">
        <Icon /> <h4 className="ml-1">{title}</h4>
      </div>
      <h3 className="mt-2 text-lg">{info}</h3>

      <div className="text-xs font-bold">{description}</div>
    </article>
  );
};

export default InfoBox;
