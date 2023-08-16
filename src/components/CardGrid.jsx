import Card from "./Card";
import data from "./data";
const CardGrid = () => {
 

  return (
    <div className="flex gap-x-8 gap-y-2 flex-wrap">
      {data.map((item, index) => {
        return <Card data={item} key={index} />;
      })}
    </div>
  );
};

export default CardGrid;
