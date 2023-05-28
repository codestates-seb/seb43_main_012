export function checkId(userId: string) {
  let idReg =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,4}$/i;
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
