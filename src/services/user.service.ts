import db from '../utils/prisma';

interface ICreateUser {
  first_name: string;
  last_name?: string;
  userId: number;
  username?: string;
}

const createUser = async (input: ICreateUser) => {
  const user = await db.user.findUnique({
    where: { telegram_id: input.userId },
  });

  if (user) {
    return user;
  }

  return db.user.create({ data: { ...input, telegram_id: input.userId } });
};

interface IFindUser {
  userId: number;
}

const findUser = async (input: IFindUser) => {
  try {
    const user = await db.user.findUnique({
      where: { telegram_id: input.userId },
    });
    return user;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

export default {
  createUser,
  findUser,
};
