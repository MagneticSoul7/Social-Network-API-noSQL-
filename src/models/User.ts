import { Schema, model, Document, ObjectId } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  thoughts: ObjectId[];
  friends: ObjectId[];
  friendCount: string;
}

const userSchema = new Schema<IUser>(
  {
    username: {
        type:String,
        require:true,
        unique:true,
        trim:true
    },
    email: {
        type:String,
        require:true,
        unique:true,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thoughts',
      },
    ],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  })

const User = model('User', userSchema);

export default User;
