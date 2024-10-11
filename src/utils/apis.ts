const BaseURL = process.env.NEXT_PUBLIC_SERVER_URL;

/**
 * 发送请求
 * @param url 请求地址
 * @param data 请求数据
 * @param options 请求配置
 * @returns
 */
export const post = (url: string, data: any, options?: Omit<RequestInit, 'body' | 'method'>) => {
  return fetch(`${BaseURL}/api/v1${url}`, {
    ...options,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: JSON.stringify(data),
  });
};

/**
 * 发送验证码
 * @param account 邮箱
 * @returns
 */
export const sendCaptchaApi = (account: string) => {
  return post('/auth/send', {
    account,
  });
};

/**
 * 邮箱验证码登录
 * @param email 邮箱
 * @param captcha 验证码
 * @returns
 */
export const loginEmailApi = (email: string, captcha: string) => {
  return post('/auth/login/email', {
    email,
    captcha,
  });
};
