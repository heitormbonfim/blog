import user from "../../schemas/user";

async function findUserByEmail(email: string) {
  try {
    const userFound = await user.findOne({ email });

    return userFound;
  } catch (error) {
    console.log(error);
    return null;
  }
}
