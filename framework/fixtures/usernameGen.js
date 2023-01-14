const genUsername = (lenght) => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const passwordLength = lenght;
  let password = "";
  for (let i = 0; i <= passwordLength; i++) {
    let randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
};

genUsername(12);

export default genUsername;
