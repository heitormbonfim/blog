import user, { User } from "../../schemas/user";

export async function createNewUser({ email, name, password, role }: User) {
  try {
    email = email.toLocaleLowerCase();

    const newUser = await user.create({
      email,
      name,
      password,
      role,
    });

    return {
      _id: newUser._id,
      email,
      name,
      role,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function findUserByEmail(email: string) {
  try {
    const userFound = await user.findOne(
      { email },
      {
        __v: 0,
        created_at: 0,
        updated_at: 0,
      }
    );

    return userFound;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function findUserById(_id: string) {
  try {
    const userFound = await user.findById(_id);

    return userFound;
  } catch (error) {
    console.error(error);
    return null;
  }
}
