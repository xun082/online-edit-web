const BaseURL = process.env.MODEL_API_BASE_URL;
console.log('shaw BaseURL', BaseURL);

/**
 * 发送验证码
 * @param email 邮箱
 * @returns
 */
export const sendCaptchaApi = (email: string) => {
  return fetch('http://localhost:8080/api/v1/auth/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      account: email,
    }),
  });
};
