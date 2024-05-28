import { StageManager } from "../../../dist/stage/stageManager.js";
import { Stage } from "../../../dist/stage/stage.js";

describe("StageManager class", () => {

  it("Should instantiate properly", () => {
    const manager = new StageManager();

    expect(manager.getStages()).toEqual([]);
    expect(manager.getSelectedStage()).toBeUndefined();
  });

  describe("select method", () => {

    it("Should not allow selecting without stages added", async () => {
      const manager = new StageManager();

      await expectAsync(manager.select(0))
        .toBeRejectedWithError(`can't access element from empty sequence`);
    });

    it("Should not allow selecting negative index", async () => {
      const manager = new StageManager();
      manager.addFirst(new Stage());
      const index = -1;

      await expectAsync(manager.select(index))
        .toBeRejectedWithError(`index must be inside [0, ${manager.getAmount()}[ (received ${index})`);
    });

    it("Should not allow selecting indexes too big", async () => {
      const manager = new StageManager();
      manager.addFirst(new Stage());
      const index = 1;

      await expectAsync(manager.select(index))
        .toBeRejectedWithError(`index must be inside [0, ${manager.getAmount()}[ (received ${index})`);
    });

    it("Should allow selecting valid stages", async () => {
      const manager = new StageManager();
      const stage = new Stage();
      manager.addLast(stage);
      const index = 0;

      await expectAsync(manager.select(index)).toBeResolvedTo(stage);
      expect(manager.getSelectedIndex()).toBe(index);
      expect(manager.getSelectedStage()).toBe(stage);
    });

    it("Should start new stage", async () => {
      const manager = new StageManager();
      const stage = new Stage();
      
      spyOn(stage, "start");

      manager.addFirst(stage);

      await manager.select(0);

      expect(stage.start).toHaveBeenCalled();
    });

    it("Should stop previous stage and start next", async () => {
      let order = "";
      const manager = new StageManager();
      const stage1 = new Stage();
      stage1.stop = () => order += '1';
      const stage2 = new Stage();
      stage2.start = () => order += '2';

      manager.addLast(stage1);
      manager.addLast(stage2);

      await manager.select(0);
      await manager.select(1);

      expect(order).toBe("12");
    });

  });

  describe("selectNext method", () => {

    it("Should not allow selecting without stages added", async () => {
      const manager = new StageManager();

      await expectAsync(manager.selectNext())
        .toBeRejectedWithError(`can't access element from empty sequence`);
    });

    it("Should not allow selecting if there is no next", () => {
      const manager = new StageManager();
      manager.addFirst(new Stage());

      manager.selectNext();

      expect(() => manager.selectNext())
        .toThrowError(`can't select next stage from last one`);
    });

    it("Should select first if no one is selected", async () => {
      const manager = new StageManager();
      const stage = new Stage();
      manager.addFirst(stage);
      const index = 0;

      await expectAsync(manager.selectNext()).toBeResolvedTo(stage);
      expect(manager.getSelectedIndex()).toBe(index);
      expect(manager.getSelectedStage()).toBe(stage);
    });

    it("Should allow selecting if there is next", async () => {
      const manager = new StageManager();
      const stage1 = new Stage();
      const stage2 = new Stage();
      manager.addLast(stage1);
      manager.addLast(stage2);
      const index = 1;

      await manager.selectNext();

      await expectAsync(manager.selectNext()).toBeResolvedTo(stage2);
      expect(manager.getSelectedIndex()).toBe(index);
      expect(manager.getSelectedStage()).toBe(stage2);
    });

    it("Should start new stage", async () => {
      const manager = new StageManager();
      const stage = new Stage();
      
      spyOn(stage, "start");

      manager.addFirst(stage);

      await manager.selectNext();

      expect(stage.start).toHaveBeenCalled();
    });

    it("Should stop previous stage and start next", async () => {
      let order = "";
      const manager = new StageManager();
      const stage1 = new Stage();
      stage1.stop = () => order += '1';
      const stage2 = new Stage();
      stage2.start = () => order += '2';

      manager.addLast(stage1);
      manager.addLast(stage2);

      await manager.selectNext();
      await manager.selectNext();

      expect(order).toBe("12");
    });

  });

  describe("selectPrevious method", () => {

    it("Should not allow selecting without stages added", async () => {
      const manager = new StageManager();

      await expectAsync(manager.selectPrevious())
        .toBeRejectedWithError(`can't access element from empty sequence`);
    });

    it("Should not allow selecting if there is no previous", () => {
      const manager = new StageManager();
      manager.addFirst(new Stage());

      manager.selectPrevious();

      expect(() => manager.selectPrevious())
        .toThrowError(`can't select previous stage from first one`);
    });

    it("Should select last if no one is selected", async () => {
      const manager = new StageManager();
      const stage = new Stage();
      manager.addFirst(stage);
      const index = 0;

      await expectAsync(manager.selectPrevious()).toBeResolvedTo(stage);
      expect(manager.getSelectedIndex()).toBe(index);
      expect(manager.getSelectedStage()).toBe(stage);
    });

    it("Should allow selecting if there is previous", async () => {
      const manager = new StageManager();
      const stage1 = new Stage();
      const stage2 = new Stage();
      manager.addLast(stage1);
      manager.addLast(stage2);
      const index = 0;

      await manager.selectPrevious();

      await expectAsync(manager.selectPrevious()).toBeResolvedTo(stage1);
      expect(manager.getSelectedIndex()).toBe(index);
      expect(manager.getSelectedStage()).toBe(stage1);
    });

    it("Should start new stage", async () => {
      const manager = new StageManager();
      const stage = new Stage();
      
      spyOn(stage, "start");

      manager.addFirst(stage);

      await manager.selectPrevious();

      expect(stage.start).toHaveBeenCalled();
    });

    it("Should stop previous stage and start next", async () => {
      let order = "";
      const manager = new StageManager();
      const stage1 = new Stage();
      stage1.start = () => order += '1';
      const stage2 = new Stage();
      stage2.stop = () => order += '2';

      manager.addLast(stage1);
      manager.addLast(stage2);

      await manager.selectPrevious();
      await manager.selectPrevious();

      expect(order).toBe("21");
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
