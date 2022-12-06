// 校验用户名
const checkName = (name: string): boolean => {
  const regExp = /^[\u4E00-\u9FA5A-Za-z0-9_]{3,20}$/;
  return regExp.test(name);
};

// 校验手机号
const checkTel = (tel: string): boolean => {
  const regExp = /^1[3-9]\d{9}$/;
  return regExp.test(tel);
};

// 校验密码
const checkPassword = (password: string): boolean => {
  const regExp = /^\w{8,32}$/;
  return regExp.test(password);
};

export default { checkName, checkTel, checkPassword };
