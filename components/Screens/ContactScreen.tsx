import type { ScreenName } from "@/utils/screens";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
type Props = {
  setScreen: (screen: ScreenName) => void;
};

export default function ContactScreen({ setScreen }: Props) {
  return (
    <div className="flex flex-col justify-center text-center text-[0.5rem]  text-white">
      <button type="button" className="screen-back text-white" onClick={() => setScreen("home")}>
        Back
      </button>
      <p className="text-[#e80050] font-bold pb-2">Contact</p>
      <div className="flex flex-row gap-2.5">
        <span aria-hidden="true" className="w-[0.5rem] shrink-0" />
        <Link
          aria-label="LinkedIn"
          href="https://www.linkedin.com/in/ebrahim-hdida/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </Link>
        <Link
          aria-label="Email"
          href="mailto:hdidaebrahim@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faEnvelope} />
        </Link>
        <Link
          aria-label="GitHub"
          href="https://github.com/NotCure"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} />
        </Link>
      </div>
    </div>
  );
}
