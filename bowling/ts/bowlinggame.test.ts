import { test, expect, beforeEach } from "vitest";
import { BowlingGame } from "./bowlinggame";

let game: BowlingGame;

beforeEach(() => {
  game = new BowlingGame();
});

function rollMany(rolls: number, pins: number) {
  for (let i = 0; i < rolls; i++) {
    game.roll(pins);
  }
}

function rollSpare(firstRoll: number) {
  game.roll(firstRoll);
  game.roll(10 - firstRoll);
}

test("it should return 0 for a game of all zeros", () => {
  rollMany(20, 0);
  expect(game.score).toEqual(0);
});

test("for 20 1s the score should be 20", () => {
  rollMany(20, 1);
  expect(game.score).toEqual(20);
});

test("Game with a spare in 1 frame and zeros should score 16", () => {
  rollSpare(3);
  game.roll(3);
  rollMany(17, 0);
  expect(game.score).toEqual(16);
});

test("Game with a strike in the first frame, then two 1s, then 0s should be 12", () => {
  game.roll(10);
  rollMany(2, 1);
  rollMany(16, 0);
  expect(game.score).toEqual(14);
});

test("Perfect game should get 300", () => {
  rollMany(12, 10);
  expect(game.score).toEqual(300);
});
