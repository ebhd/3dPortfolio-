"use client";

import type { ScreenName } from "@/utils/screens";

import styles from "./css/BinaryGrid.module.css";

function generateBinaryString(length: number): string {
  return Array.from({ length }, () => (Math.random() > 0.5 ? "1" : "0")).join(
    ""
  );
}
type Props = {
  setScreen: (screen: ScreenName) => void;
};
export default function BinaryGrid({ setScreen }: Props) {
  const binaryElements = [
    [generateBinaryString(46)],
    [
      generateBinaryString(11),
      <button
        type="button"
        key="home"
        className={styles.linkCell}
        data-label="Home"
        aria-label="Home"
        onClick={() => setScreen("home")}
      >
        0111000001110010
      </button>,
      generateBinaryString(19),
    ],
    [generateBinaryString(46)],
    [generateBinaryString(46)],

    [
      generateBinaryString(4),
      <button
        type="button"
        key="about"
        className={styles.linkCell}
        data-label="About Me"
        aria-label="About Me"
        onClick={() => setScreen("about")}
        style={{
          textDecorationColor: "#007ae8",
          ["--label-color" as string]: "#007ae8",
        }}
      >
        0110100101101110
      </button>,
      generateBinaryString(26),
    ],
    [generateBinaryString(46)],
    [generateBinaryString(46)],
    [generateBinaryString(46)],

    [
      generateBinaryString(16),
      <button
        type="button"
        key="projects"
        className={styles.linkCell}
        data-label="Projects"
        aria-label="Projects"
        onClick={() => setScreen("projects")}
        style={{
          textDecorationColor: "#f5f52c",
          ["--label-color" as string]: "#f5f52c",
        }}
      >
        0110001101101111
      </button>,
      generateBinaryString(14),
    ],
    [generateBinaryString(46)],
    [generateBinaryString(46)],
    [
      generateBinaryString(26),
      <button
        type="button"
        key="contact"
        className={styles.linkCell}
        data-label="Contact"
        aria-label="Contact"
        onClick={() => setScreen("contact")}
        style={{
          textDecorationColor: "#e80050",
          ["--label-color" as string]: "#e80050",
        }}
      >
        0110001101101111
      </button>,
      generateBinaryString(4),
    ],
    [generateBinaryString(46)],
    [generateBinaryString(46)],
    [generateBinaryString(46)],
    [generateBinaryString(46)],
    [generateBinaryString(46)],
    [generateBinaryString(46)],
    [generateBinaryString(46)],
  ];

  return (
    <div className={styles.matrix}>
      {binaryElements.map((line, i) => (
        <div key={i} className={styles.line}>
          {line.map((part, j) =>
            typeof part === "string" ? (
              <span key={`bin-${j}`} className={styles.cell}>
                {part}
              </span>
            ) : (
              part
            )
          )}
        </div>
      ))}
    </div>
  );
}
