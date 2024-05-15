import InputBarang from "./inputBarang";
import ParamFilter from "./paramFilter";

export default function Calculation() {
  return (
    <>
      <div className="flex flex-cols-2 gap-4 w-full justify-between">
        <InputBarang />
        <ParamFilter />
      </div>
    </>
  );
}
