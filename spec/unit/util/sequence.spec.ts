import { Sequence } from "../../../dist/util/sequence.js";

describe("Sequence class", () => {

  it("Should instantiate properly", () => {
    const sequence = new Sequence();

    expect(sequence.getElements()).toEqual([]);
  });

  describe("add method", () => {

    it("Should not allow adding elements to negative indexes", () => {
      const sequence = new Sequence<number>();
      const index = -1;
  
      expect(() => sequence.add(index, 1))
        .toThrowError(`index must be inside [0, ${sequence.getAmount()}] (received ${index})`);
    });

    it("Should not allow adding elements to indexes too great", () => {
      const sequence = new Sequence<number>();
      const index = 1;
  
      expect(() => sequence.add(index, 1))
        .toThrowError(`index must be inside [0, ${sequence.getAmount()}] (received ${index})`);
    });

    it("Should allow adding elements to index 0", () => {
      const sequence = new Sequence<number>();
      const element = 1;
      const index = 0;
  
      sequence.add(index, element);

      expect(sequence.getElements()).toEqual([ element ]);
    });

    it("Should allow adding elements to valid indexes", () => {
      const sequence = new Sequence<number>();
      const element1 = 1;
      const element2 = 2;
      sequence.add(0, element1);
      const index = 1;
  
      sequence.add(index, element2);

      expect(sequence.getElements()).toEqual([ element1, element2 ]);
    });

    it("Should push forward existing objects", () => {
      const sequence = new Sequence<number>();
      const index = 0;
      const element1 = 1;
      const element2 = 2;
  
      sequence.add(index, element1);
      sequence.add(index, element2);

      expect(sequence.getElements()).toEqual([ element2, element1 ]);
    });

  });

  describe("addFirst method", () => {

    it("Should add element to the start", () => {
      const sequence = new Sequence<number>();
      const element1 = 1;
      const element2 = 2;

      sequence.addFirst(element1);
      sequence.addFirst(element2);

      expect(sequence.getElements()).toEqual([ element2, element1 ]);
    });

  });

  describe("addLast method", () => {

    it("Should add element to the end", () => {
      const sequence = new Sequence<number>();
      const element1 = 1;
      const element2 = 2;

      sequence.addLast(element1);
      sequence.addLast(element2);

      expect(sequence.getElements()).toEqual([ element1, element2 ]);
    });

  });

  describe("removeFrom method", () => {

    it("Should not allow removing when empty", () => {
      const sequence = new Sequence<number>();
      const index = 0;
  
      expect(() => sequence.removeFrom(index))
        .toThrowError(`can't access element from empty sequence`);
    });

    it("Should not allow removing elements from negative indexes", () => {
      const sequence = new Sequence<number>();
      sequence.addFirst(1);
      const index = -1;
  
      expect(() => sequence.removeFrom(index))
        .toThrowError(`index must be inside [0, ${sequence.getAmount()}[ (received ${index})`);
    });

    it("Should not allow removing elements from indexes too big", () => {
      const sequence = new Sequence<number>();
      sequence.addFirst(1);
      const index = 1;
  
      expect(() => sequence.removeFrom(index))
        .toThrowError(`index must be inside [0, ${sequence.getAmount()}[ (received ${index})`);
    });

    it("Should allow removing elements from valid indexes", () => {
      const sequence = new Sequence<number>();
      const element1 = 1;
      const element2 = 2;
      const index = 1;

      sequence.addFirst(element1);
      sequence.addFirst(element2);
      
      expect(sequence.removeFrom(index)).toBe(element1);
      expect(sequence.getElements()).toEqual([ element2 ]);
    });

  });

  describe("remove method", () => {

    it("Should not remove not found object", () => {
      const sequence = new Sequence<number>();
      const element1 = 1;
      const element2 = 2;

      sequence.addFirst(element1);
      
      expect(sequence.remove(element2)).toBeFalse();
      expect(sequence.getElements()).toEqual([ element1 ]);
    });

    it("Should remove found object", () => {
      const sequence = new Sequence<number>();
      const element1 = 1;
      const element2 = 2;

      sequence.addFirst(element1);
      sequence.addFirst(element2);

      expect(sequence.remove(element1)).toBeTrue();
      expect(sequence.getElements()).toEqual([ element2 ]);
    });

  });

  describe("removeFirst method", () => {

    it("Should return undefined on empty sequence", () => {
      const sequence = new Sequence<number>();

      expect(sequence.removeFirst()).toBeUndefined();
    });

    it("Should remove first element from sequence", () => {
      const sequence = new Sequence<number>();
      const element1 = 1;
      const element2 = 2;

      sequence.addFirst(element1);
      sequence.addFirst(element2);

      expect(sequence.removeFirst()).toBe(element2);
      expect(sequence.getElements()).toEqual([ element1 ]);
    });

  });

  describe("removeLast method", () => {

    it("Should return undefined on empty sequence", () => {
      const sequence = new Sequence<number>();

      expect(sequence.removeLast()).toBeUndefined();
    });

    it("Should remove last element from sequence", () => {
      const sequence = new Sequence<number>();
      const element1 = 1;
      const element2 = 2;

      sequence.addFirst(element1);
      sequence.addFirst(element2);

      expect(sequence.removeLast()).toBe(element1);
      expect(sequence.getElements()).toEqual([ element2 ]);
    });

  });

  describe("removeAll method", () => {

    it("Should remove and return all elements", () => {
      const sequence = new Sequence<number>();
      const element1 = 1;
      const element2 = 2;
      const element3 = 3;

      sequence.addFirst(element1);
      sequence.addFirst(element2);
      sequence.addFirst(element3);

      const elements = sequence.getElements();

      expect(sequence.removeAll()).toEqual(elements);
      expect(sequence.getElements()).toEqual([]);
    });

  });

  describe("getElements method", () => {

    it("Should return clone of elements", () => {
      const sequence = new Sequence<number>();

      sequence.addLast(1);
      sequence.addLast(2);
      sequence.addLast(3);

      const elements = sequence.getElements();
      delete elements[0];
      delete elements[1];
      delete elements[2];

      expect(elements).not.toEqual(sequence.getElements());
      expect(elements).not.toBe(sequence.getElements());
    });

  });

  describe("getFrom method", () => {

    it("Should not allow getting when empty", () => {
      const sequence = new Sequence<number>();
      const index = 0;
  
      expect(() => sequence.getFrom(index))
        .toThrowError(`can't access element from empty sequence`);
    });

    it("Should not allow getting elements from negative indexes", () => {
      const sequence = new Sequence<number>();
      sequence.addFirst(1);
      const index = -1;
  
      expect(() => sequence.getFrom(index))
        .toThrowError(`index must be inside [0, ${sequence.getAmount()}[ (received ${index})`);
    });

    it("Should not allow getting elements from indexes too big", () => {
      const sequence = new Sequence<number>();
      sequence.addFirst(1);
      const index = 1;
  
      expect(() => sequence.getFrom(index))
        .toThrowError(`index must be inside [0, ${sequence.getAmount()}[ (received ${index})`);
    });

    it("Should allow getting elements from valid indexes", () => {
      const sequence = new Sequence<number>();
      const element1 = 1;
      const element2 = 2;
      const index = 1;

      sequence.addFirst(element1);
      sequence.addFirst(element2);

      expect(sequence.getFrom(index)).toBe(element1);
    });

  });

  describe("getIndex method", () => {

    it("Should return index of found element", () => {
      const sequence = new Sequence<number>();
      const element1 = 1;
      const element2 = 2;
      const expectedIndex = 1;

      sequence.addFirst(element1);
      sequence.addFirst(element2);

      expect(sequence.getIndex(element1)).toBe(expectedIndex);
    });

    it("Should not return index of not found element", () => {
      const sequence = new Sequence<number>();
      const element = 1;
      const expectedIndex = -1;

      expect(sequence.getIndex(element)).toBe(expectedIndex);
    });

  });

  describe("getFirst method", () => {

    it("Should return undefined on empty sequence", () => {
      const sequence = new Sequence<number>();

      expect(sequence.getFirst()).toBeUndefined();
    });

    it("Should return first element from sequence", () => {
      const sequence = new Sequence<number>();
      const element1 = 1;
      const element2 = 2;

      sequence.addFirst(element1);
      sequence.addFirst(element2);

      expect(sequence.getFirst()).toBe(element2);
    });

  });

  describe("getLast method", () => {

    it("Should return undefined on empty sequence", () => {
      const sequence = new Sequence<number>();

      expect(sequence.getLast()).toBeUndefined();
    });

    it("Should return last element from sequence", () => {
      const sequence = new Sequence<number>();
      const element1 = 1;
      const element2 = 2;

      sequence.addFirst(element1);
      sequence.addFirst(element2);

      expect(sequence.getLast()).toBe(element1);
    });

  });

});