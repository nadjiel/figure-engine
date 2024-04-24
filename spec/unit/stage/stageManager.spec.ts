import { StageManager } from "../../../dist/stage/stageManager.js";
import { Stage } from "../../../dist/stage/stage.js";

describe("StageManager class", () => {

  it("Should instantiate properly", () => {
    const manager = new StageManager();

    expect(manager.getStages()).toEqual([]);
    expect(manager.getSelectedStage()).toBeUndefined();
  });

  describe("select method", () => {

    it("Should not allow selecting without stages added", () => {
      const manager = new StageManager();

      expect(() => manager.select(0))
        .toThrowError(`can't access element from empty sequence`);
    });

    it("Should not allow selecting negative index", () => {
      const manager = new StageManager();
      manager.addFirst(new Stage());
      const index = -1;

      expect(() => manager.select(index))
        .toThrowError(`index must be inside [0, ${manager.getAmount()}[ (received ${index})`);
    });

    it("Should not allow selecting indexes too big", () => {
      const manager = new StageManager();
      manager.addFirst(new Stage());
      const index = 1;

      expect(() => manager.select(index))
        .toThrowError(`index must be inside [0, ${manager.getAmount()}[ (received ${index})`);
    });

    it("Should allow selecting valid stages", () => {
      const manager = new StageManager();
      const stage = new Stage();
      manager.addLast(stage);
      const index = 0;

      expect(manager.select(index)).toBe(stage);
      expect(manager.getSelectedIndex()).toBe(index);
      expect(manager.getSelectedStage()).toBe(stage);
    });

  });

  describe("selectNext method", () => {

    it("Should not allow selecting without stages added", () => {
      const manager = new StageManager();

      expect(() => manager.selectNext())
        .toThrowError(`can't access element from empty sequence`);
    });

    it("Should not allow selecting if there is no next", () => {
      const manager = new StageManager();
      manager.addFirst(new Stage());

      manager.selectNext();

      expect(() => manager.selectNext())
        .toThrowError(`index must be inside [0, ${manager.getAmount()}[ (received ${1})`);
    });

    it("Should select first if no one is selected", () => {
      const manager = new StageManager();
      const stage = new Stage();
      manager.addFirst(stage);
      const index = 0;

      expect(manager.selectNext()).toBe(stage);
      expect(manager.getSelectedIndex()).toBe(index);
      expect(manager.getSelectedStage()).toBe(stage);
    });

    it("Should allow selecting if there is next", () => {
      const manager = new StageManager();
      const stage1 = new Stage();
      const stage2 = new Stage();
      manager.addLast(stage1);
      manager.addLast(stage2);
      const index = 1;

      manager.selectNext();

      expect(manager.selectNext()).toBe(stage2);
      expect(manager.getSelectedIndex()).toBe(index);
      expect(manager.getSelectedStage()).toBe(stage2);
    });

  });

  describe("selectPrevious method", () => {

    it("Should not allow selecting without stages added", () => {
      const manager = new StageManager();

      expect(() => manager.selectPrevious())
        .toThrowError(`can't access element from empty sequence`);
    });

    it("Should not allow selecting if there is no previous", () => {
      const manager = new StageManager();
      manager.addFirst(new Stage());

      manager.selectPrevious();

      expect(() => manager.selectPrevious())
        .toThrowError(`index must be inside [0, ${manager.getAmount()}[ (received ${-1})`);
    });

    it("Should select last if no one is selected", () => {
      const manager = new StageManager();
      const stage = new Stage();
      manager.addFirst(stage);
      const index = 0;

      expect(manager.selectPrevious()).toBe(stage);
      expect(manager.getSelectedIndex()).toBe(index);
      expect(manager.getSelectedStage()).toBe(stage);
    });

    it("Should allow selecting if there is previous", () => {
      const manager = new StageManager();
      const stage1 = new Stage();
      const stage2 = new Stage();
      manager.addLast(stage1);
      manager.addLast(stage2);
      const index = 0;

      manager.selectPrevious();

      expect(manager.selectPrevious()).toBe(stage1);
      expect(manager.getSelectedIndex()).toBe(index);
      expect(manager.getSelectedStage()).toBe(stage1);
    });

  });

  describe("getSelectedStage method", () => {

    it("Should return undefined when no one is selected", () => {
      const manager = new StageManager();

      expect(manager.getSelectedStage()).toBeUndefined();
    });

    it("Should return selected stage", () => {
      const manager = new StageManager();
      const stage1 = new Stage();
      const stage2 = new Stage();
      manager.addLast(stage1);
      manager.addLast(stage2);

      manager.selectPrevious();

      expect(manager.getSelectedStage()).toBe(stage2);
    });

  });

});
