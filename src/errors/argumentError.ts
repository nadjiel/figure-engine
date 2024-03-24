
export class ArgumentError extends Error {

  constructor(msg: string) {
    super(msg);
    this.name = "Argument Error";
  }

}

export default ArgumentError;
