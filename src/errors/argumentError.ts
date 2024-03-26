/**
 * The `ArgumentError` class represents any error that's triggered by a wrong
 * argument passed to a method.
 * 
 * @version 0.1.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class ArgumentError extends Error {

  /**
   * @param msg The error message.
   */
  constructor(msg: string) {
    super(msg);
    this.name = "Argument Error";
  }

}

export default ArgumentError;
