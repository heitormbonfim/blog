import bcrypt from "bcrypt";

export function hashString(value: string) {
  const saltRounds = Number(process.env.BCRYPT_SALT) || 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedValue = bcrypt.hashSync(value, salt);

  return hashedValue;
}

export function compareHash(value: string, hashedValue: string) {
  const valueComparison = bcrypt.compareSync(value, hashedValue);
  return valueComparison;
}
