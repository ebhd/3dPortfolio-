import type { ScreenName } from "@/utils/screens";
type Props = {
  setScreen: (screen: ScreenName) => void;
};

export default function AboutScreen({ setScreen }: Props) {
  return (
    <div className=" ">
      <button type="button" className="screen-back text-white" onClick={() => setScreen("home")}>
        {" "}
        Back
      </button>
      <p className="text-[#007ae8] font-bold text-[0.4rem]">About Me:</p>
      <p className="text-[0.25rem] font-light text-white">
        My name is Ebrahim, Currently Computer Science student in Belguim.
        <br />
        Im intrested in Low-level programming, and currently front-end mostly.
      </p>
    </div>
  );
}
