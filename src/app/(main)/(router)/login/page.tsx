'use client';

import { FC, MouseEvent, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { PROJECT_Name } from '@/utils/constants';
import { cn } from '@/utils';
import { BackgroundBeams } from '@/components/home/background-beams';
import { Header } from '@/components/home/header';
import { loginEmailApi, sendCaptchaApi } from '@/utils/apis';
import { useAuthStore } from '@/store/authStore';

enum LoginType {
  CAPTCHA,
  PASSWORD,
}

/**
 * 登录信息
 */
interface LoginInfo {
  email: string;
  emailErrMsg?: string;
  captcha?: string;
  captchaErrMsg?: string;
  password?: string;
  passwordErrMsg?: string;
}

/**
 * 默认验证码登录状态
 */
const defaultCaptchaState = {
  email: '',
  emailErrMsg: '',
  captcha: '',
  captchaErrMsg: '',
};

/**
 * 默认密码登录状态
 */
const defaultPasswordState = {
  email: '',
  emailErrMsg: '',
  password: '',
  passwordErrMsg: '',
};

/**
 * 登录信息reducer动作
 */
interface LoginInfoReducerAction {
  type: 'changePassword' | 'changeEmail' | 'changeCaptcha' | 'validate' | 'validateCaptcha';
  payload?: string;
}

/**
 * 登录信息reducer
 */
type LoginInfoReducer = (state: LoginInfo, action: LoginInfoReducerAction) => LoginInfo;

/**
 * 登录信息reducer实现
 */
const loginInfoReducer: LoginInfoReducer = (state: LoginInfo, action: LoginInfoReducerAction) => {
  const { payload = '', type } = action;

  switch (type) {
    case 'changePassword':
      return {
        ...state,
        password: payload,
        passwordErrMsg: payload ? '' : '请输入密码',
      };
    case 'changeEmail':
      const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(payload);

      return {
        ...state,
        email: payload,
        emailErrMsg: emailValid ? '' : '请输入正确的邮箱',
      };
    case 'changeCaptcha':
      return {
        ...state,
        captcha: payload,
        captchaErrMsg: payload ? '' : '请输入验证码',
      };
    case 'validate':
      const errMsg: Pick<LoginInfo, 'emailErrMsg' | 'passwordErrMsg' | 'captchaErrMsg'> = {
        emailErrMsg: state.email ? '' : '请输入正确的邮箱',
      };

      if (state.password === '') {
        errMsg.passwordErrMsg = '请输入密码';
      }

      if (state.captcha === '') {
        errMsg.captchaErrMsg = '请输入验证码';
      }

      return {
        ...state,
        ...errMsg,
      };
    case 'validateCaptcha':
      const captchaValid = state.captcha === payload;

      return {
        ...state,
        captchaErrMsg: captchaValid ? '' : '验证码错误',
      };
    default:
      return {
        ...state,
      };
  }
};

/**
 * 验证码倒计时最大值
 */
const maxCountdown = 60;

/**
 * 获取验证码
 * @returns
 */
const CaptchaTimer = ({ disabled, email }: { disabled: boolean; email: string }) => {
  const [countdown, setCountdown] = useState<number>(null!);
  const interval = useRef<any>(null);

  useEffect(() => {
    if (countdown === 0) {
      // 重置
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }

      setCountdown(null!);
    } else if (countdown === maxCountdown && !interval.current) {
      // 启动定时器
      interval.current = setInterval(() => {
        setCountdown((n) => n - 1);
      }, 1000);
    }
  }, [countdown]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    };
  }, []);

  const sendCaptcha = () => {
    setCountdown(maxCountdown);

    sendCaptchaApi(email).then(
      async (resp) => {
        const res = await resp.json();
        console.log('sendCaptchaApi res', res);

        // TODO 发送成功提示
      },
      (err) => {
        console.error('sendCaptchaApi err', err);
        // TODO 发送失败提示
      },
    );
  };

  return (
    <button
      className="w-28 h-10 ml-4 px-3 flex-none border-2 rounded-lg disabled:cursor-not-allowed"
      disabled={disabled || !!countdown}
      onClick={sendCaptcha}
    >
      {!countdown ? '获取验证码' : countdown + 's'}
    </button>
  );
};

/**
 * 验证码登录
 * @returns
 */
const CaptchaLogin = ({ login }: { login: (state: LoginInfo) => Promise<void> }) => {
  const [loginInfo, loginInfoDispatch] = useReducer<LoginInfoReducer, LoginInfo>(
    loginInfoReducer,
    { ...defaultCaptchaState },
    () => ({ ...defaultCaptchaState }),
  );

  const [processing, setProcessing] = useState<boolean>(false);

  const emailValid: boolean = !!loginInfo.email && !loginInfo.emailErrMsg;
  const valid: boolean = emailValid && !!loginInfo.captcha && !loginInfo.captchaErrMsg;

  const submit = (e: MouseEvent) => {
    e.preventDefault();

    if (valid) {
      setProcessing(true);

      login({
        email: loginInfo.email,
        captcha: loginInfo.captcha,
      }).finally(() => {
        setProcessing(false);
      });
    } else {
      loginInfoDispatch({ type: 'validate' });
    }
  };

  return (
    <form className="mt-3.5">
      <div className="LoginPageFormItem pb-6 relative text-sm">
        <input
          className={cn(
            'w-full h-10 pl-3 pr-1 py-2 rounded-lg bg-[#e5e5e5]/15 text-white/60 border-2 hidden sm:block outline-none focus:text-white focus:border-2',
            loginInfo.emailErrMsg ? 'border-rose-400' : 'focus:border-neutral-400',
          )}
          type="text"
          placeholder="邮箱"
          onChange={(e) => loginInfoDispatch({ type: 'changeEmail', payload: e.target.value })}
        />

        {loginInfo.emailErrMsg ? (
          <div className="absolute left-0 top-11 text-rose-400 text-xs">
            {loginInfo.emailErrMsg}
          </div>
        ) : null}
      </div>
      <div className="LoginPageFormItem pb-6 relative flex items-center text-sm">
        <input
          className={cn(
            'w-full h-10 pl-3 pr-1 py-2 rounded-lg bg-[#e5e5e5]/15 text-white/60 border-2 hidden sm:block outline-none focus:text-white focus:border-2',
            loginInfo.captchaErrMsg ? 'border-rose-400' : 'focus:border-neutral-400',
          )}
          type="text"
          placeholder="验证码"
          onChange={(e) => loginInfoDispatch({ type: 'changeCaptcha', payload: e.target.value })}
        />

        <CaptchaTimer disabled={!emailValid} email={loginInfo.email} />

        {loginInfo.captchaErrMsg ? (
          <div className="absolute left-0 top-11 text-rose-400 text-xs">
            {loginInfo.captchaErrMsg}
          </div>
        ) : null}
      </div>
      <button
        className="w-full h-10 flex justify-center items-center text-sm border-2 rounded-lg disabled:cursor-not-allowed"
        disabled={!valid || processing}
        onClick={submit}
      >
        立即登录
      </button>
    </form>
  );
};

/**
 * 密码登录
 * @returns
 */
const PasswordLogin = ({ login }: { login: (state: LoginInfo) => Promise<void> }) => {
  const [loginInfo, loginInfoDispatch] = useReducer<LoginInfoReducer, LoginInfo>(
    loginInfoReducer,
    { ...defaultPasswordState },
    () => ({ ...defaultPasswordState }),
  );

  const [processing, setProcessing] = useState<boolean>(false);

  const valid: boolean =
    !!loginInfo.email &&
    !!loginInfo.password &&
    !loginInfo.emailErrMsg &&
    !loginInfo.passwordErrMsg;

  const submit = useCallback((e: MouseEvent) => {
    e.preventDefault();

    if (valid) {
      setProcessing(true);

      login({
        email: loginInfo.email,
        captcha: loginInfo.password,
      }).finally(() => {
        setProcessing(false);
      });
    } else {
      loginInfoDispatch({ type: 'validate' });
    }
  }, []);

  return (
    <form className="mt-3.5">
      <div className="LoginPageFormItem pb-6 relative text-sm">
        <input
          className={cn(
            'w-full h-10 pl-3 pr-1 py-2 rounded-lg bg-[#e5e5e5]/15 text-white/60 border-2 hidden sm:block outline-none focus:text-white focus:border-2',
            loginInfo.emailErrMsg ? 'border-rose-400' : 'focus:border-neutral-400',
          )}
          type="text"
          placeholder="邮箱"
          onChange={(e) => loginInfoDispatch({ type: 'changeEmail', payload: e.target.value })}
        />

        {loginInfo.emailErrMsg ? (
          <div className="absolute left-0 top-11 text-rose-400 text-xs">
            {loginInfo.emailErrMsg}
          </div>
        ) : null}
      </div>
      <div className="LoginPageFormItem pb-6 relative flex items-center text-sm">
        <input
          className={cn(
            'w-full h-10 pl-3 pr-1 py-2 rounded-lg bg-[#e5e5e5]/15 text-white/60 border-2 hidden sm:block outline-none focus:text-white focus:border-2',
            loginInfo.passwordErrMsg ? 'border-rose-400' : 'focus:border-neutral-400',
          )}
          type="password"
          placeholder="密码"
          onChange={(e) => loginInfoDispatch({ type: 'changePassword', payload: e.target.value })}
        />

        {loginInfo.passwordErrMsg ? (
          <div className="absolute left-0 top-11 text-rose-400 text-xs">
            {loginInfo.passwordErrMsg}
          </div>
        ) : null}
      </div>
      <button
        className="w-full h-10 flex justify-center items-center text-sm border-2 rounded-lg disabled:cursor-not-allowed"
        disabled={!valid || processing}
        onClick={submit}
      >
        立即登录
      </button>
    </form>
  );
};

const LoginPage: FC = () => {
  const { getAuth, setAuth } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loginType, setLoginType] = useState<LoginType>(LoginType.CAPTCHA);

  // 如果已经登录，则跳转到首页或redirect地址
  useEffect(() => {
    const auth = getAuth();

    if (auth.access_token) {
      router.push(searchParams.get('redirect') ?? '/');
    }
  }, []);

  const login = async (state: LoginInfo): Promise<void> => {
    if (loginType === LoginType.CAPTCHA) {
      await loginEmailApi(state.email, state.captcha!).then(
        async (resp) => {
          const res = await resp.json();
          console.log('loginEmailApi res', res);

          if (res.code === 200) {
            // 登录成功
            // TODO 成功提示
            setAuth(res.data);
            router.push(searchParams.get('redirect') ?? '/');
          } else {
            // 登录失败
            // TODO 失败提示
            console.error('loginEmailApi err', res.message);
          }
        },
        (err) => {
          console.error('loginEmailApi err', err);
          // TODO 失败提示
        },
      );
    }
  };

  return (
    <>
      <div className="LoginPage w-screen h-screen relative z-10 flex flex-col items-center">
        <Header title={PROJECT_Name} icons={[]} router={[]} />

        <main className="LoginPageMain w-full h-full flex-1 flex">
          <div className="LoginPageBanner w-4/6 h-full px-60 flex justify-center items-center">
            <img alt="preview" className="object-contain" src="/images/preview.png"></img>
          </div>
          <div className="LoginPageForm w-2/6 min-w-[375px] h-full px-[4px] flex items-center">
            <div className="w-[367px] px-[40px] py-[30px] rounded-lg bg-[rgba(17,17,17,1)] opacity-90">
              <h2 className="text-2xl">欢迎来到{PROJECT_Name}!</h2>

              {/* 登录方式 */}
              <div className="LoginPageType mt-5 flex justify-start">
                <div className="p-0.5 flex items-center text-sm bg-[rgba(17,17,17,1)] rounded-md">
                  <span
                    className={cn(
                      'px-2 leading-6 rounded-sm transition-colors cursor-pointer',
                      loginType === LoginType.CAPTCHA ? 'bg-gray-600' : '',
                    )}
                    onClick={() => setLoginType(LoginType.CAPTCHA)}
                  >
                    验证码
                  </span>
                  <span
                    className={cn(
                      'px-2 leading-6 rounded-sm transition-colors cursor-pointer',
                      loginType === LoginType.PASSWORD ? 'bg-gray-600' : '',
                    )}
                    onClick={() => setLoginType(LoginType.PASSWORD)}
                  >
                    密码
                  </span>
                </div>
              </div>

              {/* 登录信息 */}
              {loginType === LoginType.CAPTCHA ? (
                <CaptchaLogin login={login} />
              ) : (
                <PasswordLogin login={login} />
              )}

              {/* 服务条款声明 */}
              <p className="mt-6 text-xs text-center">注册或登录则表示您已同意服务条款</p>
            </div>
          </div>
        </main>
      </div>

      <BackgroundBeams />
    </>
  );
};

export default LoginPage;
