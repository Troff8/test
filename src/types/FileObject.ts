export enum Type {
  CORRECT,
  INCORRECT,
  DEFAULT,
}

export type FileObject = {
  id: number;
  type: Type;
  comment: string;
  text: string;
};
