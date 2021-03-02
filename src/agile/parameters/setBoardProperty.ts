export interface SetBoardProperty {
  /** the ID of the board on which the property will be set. */
  boardId: string;
  /** the key of the board's property. The maximum length of the key is 255 bytes. */
  propertyKey: string;
}
