import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './User';

class Record {
  _id: string;

  @prop({ required: true })
  name: string;

  @prop({ required: true, ref: () => User })
  user: Ref<User>;
}

const RecordModel = getModelForClass(Record);

export default RecordModel;
