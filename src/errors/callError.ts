/**
 * The `CallError` class represents any error that's triggered by a wrong call
 * to a method.
 * 
 * @version 0.1.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class CallError extends Error {

  /**
   * @param msg The error message.
   */
  constructor(msg: string) {
    super(msg);
    this.name = "Call Error";
  }

}

export default CallError;
