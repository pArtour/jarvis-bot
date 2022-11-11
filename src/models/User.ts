import { prop, getModelForClass } from '@typegoose/typegoose';

export class User {
  @prop()
  public userId: number;
}

export const UserModel = getModelForClass<typeof User>(User);
