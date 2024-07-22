/**
 * The `ResourceError` class represents any error related to
 * a game `Resource`.
 * 
 * @version 0.4.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class ResourceError extends Error {

  /**
   * @param msg The error message.
   */
  constructor(msg: string) {
    super(msg);
    this.name = "Resource Error";
  }

}

export default ResourceError;
