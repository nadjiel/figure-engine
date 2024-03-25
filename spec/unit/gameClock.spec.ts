import { GameClock } from "../../dist/gameClock.js";

describe("GameClock class", () => {

  it("Should throw error with negative fps", () => {
    const fps = -60;
    const onStep = () => {};

    expect(() => new GameClock(fps, onStep))
      .toThrowError(`fps must be positive (received ${fps})`);
  });

  it("Should throw error with fps 0", () => {
    const fps = 0;
    const onStep = () => {};

    expect(() => new GameClock(fps, onStep))
      .toThrowError(`fps must be positive (received ${fps})`);
  });

  it("Should instantiate with valid parameters", () => {
    const fps = 60;
    const onStep = () => {};
    const initialFrame = 0;

    const gameClock = new GameClock(fps, onStep);

    expect(gameClock.getFps()).toBe(fps);
    expect(gameClock.getActualFps()).toBeUndefined();
    expect(gameClock.getCurrentFrame()).toBe(initialFrame);
    expect(gameClock.getStartTime()).toBeUndefined();
    expect(gameClock.getCurrentTime()).toBeUndefined();
    expect(gameClock.isRunning()).toBeFalse();
  });

  describe("getActualFps method", () => {

    it("Should be undefined if game clock hasn't started", () => {
      const fps = 120;
      const onStep = () => {};
      const gameClock = new GameClock(fps, onStep);

      const actualFps = gameClock.getActualFps();

      expect(actualFps).toBeUndefined();
    });

    it("Should be less or equal to set fps if game clock has started", async () => {
      const fps = 120;
      let step = () => {};
      const onStep = () => step();
      const gameClock = new GameClock(fps, onStep);

      const runGameClock = new Promise<void>((resolve, reject) => {
        step = () => {
          gameClock.stop();
          resolve();
        }

        gameClock.start();
      });
      await runGameClock;

      const actualFps = gameClock.getActualFps();

      expect(actualFps).toBeLessThanOrEqual(fps);
    });

  });

  describe("measureFps method", () => {

    it("Should throw error with negative amount", () => {
      const fps = 120;
      const onStep = () => {};
      const gameClock = new GameClock(fps, onStep);
      const amount = -1;
  
      expect(() => gameClock.measureFps(amount))
        .toThrowError(`amount must be greater or equal to 0 (received ${amount})`);
    });

    it("Should not collect intervals with amount set to 0", async () => {
      const fps = 120;
      let step = () => {};
      const onStep = () => step();
      const gameClock = new GameClock(fps, onStep);
      const amount = 0;

      gameClock.measureFps(amount);

      const runGameClock = new Promise<void>((resolve, reject) => {
        step = () => {
          gameClock.stop();
          resolve();
        }

        gameClock.start();
      });
      await runGameClock;
  
      expect(gameClock.getActualFps()).toBeUndefined();
    });

    it("Should remove collected intervals when amount is set to 0", async () => {
      const fps = 120;
      let step = () => {};
      const onStep = () => step();
      const gameClock = new GameClock(fps, onStep);
      const amount = 0;
  
      const runGameClock = new Promise<void>((resolve, reject) => {
        step = () => {
          const currentFrame = gameClock.getCurrentFrame();

          if(currentFrame === 1) {
            gameClock.measureFps(amount);
          }
          if(currentFrame === 2) {
            gameClock.stop();
            resolve();
          }
        }
  
        gameClock.start();
      });
      await runGameClock;
  
      expect(gameClock.getActualFps()).toBeUndefined();
    });

  });

  describe("start method", () => {

    it("Should start game if it hasn't started", () => {
      const fps = 120;
      const onStep = () => {};
      const gameClock = new GameClock(fps, onStep);
  
      gameClock.start();

      expect(gameClock.isRunning()).toBeTrue();

      gameClock.stop();
    });

    it("Should throw error if game is already running", () => {
      const fps = 120;
      const onStep = () => {};
      const gameClock = new GameClock(fps, onStep);
  
      gameClock.start();
  
      expect(() => gameClock.start())
        .toThrowError(`can't call start on already running game`);

      gameClock.stop();
    });

    it("Should throw error trying to start game that has been stopped", async () => {
      const fps = 120;
      let step = () => {};
      const onStep = () => step();
      const gameClock = new GameClock(fps, onStep);
  
      const runGameClock = new Promise<void>((resolve, reject) => {
        step = () => {
          gameClock.stop();
          resolve();
        }
  
        gameClock.start();
      });
      await runGameClock;
  
      expect(() => gameClock.start())
        .toThrowError(`can't call start on game that has been stopped`);
    });

  });

  describe("stop method", () => {

    it("Should throw error if called with game that hasn't started", () => {
      const fps = 120;
      const onStep = () => {};
      const gameClock = new GameClock(fps, onStep);

      expect(() => gameClock.stop())
        .toThrowError(`can't call stop on already stopped game`);
    });

    it("Should throw error if called with game that has already been stopped", async () => {
      const fps = 120;
      let step = () => {};
      const onStep = () => step();
      const gameClock = new GameClock(fps, onStep);
  
      const runGameClock = new Promise<void>((resolve, reject) => {
        step = () => {
          gameClock.stop();
          resolve();
        }
  
        gameClock.start();
      });
      await runGameClock;
  
      expect(() => gameClock.stop())
        .toThrowError(`can't call stop on already stopped game`);
    });

    it("Should stop game if it is running", async () => {
      const fps = 120;
      let step = () => {};
      const onStep = () => step();
      const gameClock = new GameClock(fps, onStep);
  
      const runGameClock = new Promise<void>((resolve, reject) => {
        step = () => {
          gameClock.stop();
          resolve();
        }
  
        gameClock.start();
      });
      await runGameClock;
  
      expect(gameClock.isRunning()).toBeFalse();
    });

  });

});
