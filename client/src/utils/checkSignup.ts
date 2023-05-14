export function checkId(userId: string) {
    let idReg = /^[a-zA-Z0-9-_.]{2,20}/g;
    return idReg.test(userId);
  }
  
  export function checkUsername(name: string) {
    let usernameReg = /[a-zA-Zㄱ-힣0-9-_.]{2,20}/g;
    return usernameReg.test(name);
  }
  
  export function checkPassword(password: string) {
    let passwordReg = /^[a-zA-Zㄱ-힣0-9-_.]{8,16}$/;
    return passwordReg.test(password);
  }
  
  export function confirmPassword(password: string, password2: string) {
    return password === password2;
  }
  