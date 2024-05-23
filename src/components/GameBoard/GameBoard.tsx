import React, { useMemo } from "react";
import Image from "next/image";

import { GameBoardProps, GemT, Player } from "@/types";

import { Gem } from "../Gem/Gem";

function GameBoard({ players }: GameBoardProps) {
  const scheme = "light";

  const getPlayer = (b: number): Player | undefined => {
    const player = players.find((pl) => pl.plan.toString() === b.toString());
    return player;
  };

  return (
    <div style={styles.container}>
      <div>
        <div style={styles.gameBoardContainer}>
          <div style={styles.sub}>
            {rows.map((a, i) => (
              <div style={styles.row} key={i}>
                {a.map((b, index) => (
                  <div
                    key={index}
                    style={styles.box}
                    data-testid={`gem-${getPlayer(b)?.id}`}
                  >
                    <Gem player={getPlayer(b)!} planNumber={b} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <Image
          src={scheme === "light" ? "/light.png" : "/dark.png"}
          alt="Game Board"
          width={800}
          height={600}
          objectFit="cover"
          style={styles.bgImage}
        />
      </div>
    </div>
  );
}

const imageHeight = 280; // s(248) + s(32) заменено на фиксированное значение
const maxImageHeight = 156; // ms(248, 0.5) + s(32) заменено на фиксированное значение
const imageTopMargin = 27; // Math.min(ms(27, 0.5), s(27)) заменено на фиксированное значение
const curImageHeight = Math.min(maxImageHeight, imageHeight) + imageTopMargin;

const imageWidth = 297; // s(279) + s(18) заменено на фиксированное значение
const maxImageWidth = 153; // ms(279, 0.5) + s(18) заменено на фиксированное значение
const curImageWidth = imageWidth >= maxImageWidth ? maxImageWidth : imageWidth;

const rows = [
  [72, 71, 70, 69, 68, 67, 66, 65, 64],
  [55, 56, 57, 58, 59, 60, 61, 62, 63],
  [54, 53, 52, 51, 50, 49, 48, 47, 46],
  [37, 38, 39, 40, 41, 42, 43, 44, 45],
  [36, 35, 34, 33, 32, 31, 30, 29, 28],
  [19, 20, 21, 22, 23, 24, 25, 26, 27],
  [18, 17, 16, 15, 14, 13, 12, 11, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
];

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    padding: "6px 20px", // Replace paddingHorizontal and paddingVertical with fixed values
    width: "90%",
    backgroundColor: "red",
  },
  gameBoardContainer: {
    height: "100%", // Replace curImageHeight with a fixed value
    marginTop: "20px", // Replace marginTop with a fixed value
    width: "100%", // Replace curImageWidth with a fixed value
    backgroundColor: "gold",
  },
  imageContainer: {
    alignItems: "center",
    alignSelf: "center",
    bottom: "30px",
    height: `${curImageHeight}px`, // Replace curImageHeight with a fixed value
  },
  bgImage: {
    height: "80%",
    top: "33px", // Replace mvs(33, 1.6) - imageTopMargin with a fixed value
  },
  box: {
    alignItems: "center",
    borderRadius: "15.5px", // Replace s(31) / 2 with a fixed value
    height: "31px", // Replace s(31) with a fixed value
    justifyContent: "center",
    margin: "2px 1px", // Replace marginHorizontal and marginVertical with fixed values
    maxHeight: "15.5px", // Replace ms(31, 0.5) with a fixed value
    maxWidth: "15.5px", // Replace ms(31, 0.5) with a fixed value
    width: "31px", // Replace s(31) with a fixed value
  },

  row: {
    display: "flex",
  },
  sub: {
    marginTop: "27px", // Replace imageTopMargin with a fixed value
  },
};

export { GameBoard };
