export function checkId(userId: string) {
  let idReg = /^[a-zA-Z0-9-_.]{2,20}/g;
  return idReg.test(userId);
}

export function checkUsername(name: string) {
  let usernameReg = /[a-zA-Zㄱ-힣0-9-_.]{4,20}/g;
  return usernameReg.test(name);
}

export function checkPassword(password: string) {
  let passwordReg =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  return passwordReg.test(password);
}

export function confirmPassword(password: string, password2: string) {
  return password === password2;
}
