type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface Params {
  cacheTime?: number; // 缓存时间，单位为秒。默认强缓存，0为不缓存
  params?: Record<string, any>;
}

interface Props extends Params {
  url: string;
  method: Method;
  mode?: RequestMode; // 添加 mode 属性
  token?: string; // 添加 token 属性
}

type Config = { next: { revalidate: number } } | { cache: 'no-store' } | { cache: 'force-cache' };

class Request {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * 请求拦截器
   */
  interceptorsRequest({ url, method, params, cacheTime, mode, token }: Props) {
    let queryParams = ''; // url参数
    let requestPayload = ''; // 请求体数据

    // 请求头
    const headers: Record<string, string> = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: Config =
      cacheTime !== undefined
        ? cacheTime > 0
          ? { next: { revalidate: cacheTime } }
          : { cache: 'no-store' }
        : { cache: 'force-cache' };

    if (method === 'GET' || method === 'DELETE') {
      // fetch 对 GET 请求等，不支持将参数传在 body 上，只能拼接 url
      if (params) {
        queryParams = new URLSearchParams(params).toString();
        url = `${url}?${queryParams}`;
      }
    } else {
      // 非 form-data 传输 JSON 数据格式
      if (
        !['[object FormData]', '[object URLSearchParams]'].includes(
          Object.prototype.toString.call(params),
        )
      ) {
        headers['Content-Type'] = 'application/json';
        requestPayload = JSON.stringify(params);
      }
    }

    return {
      url,
      options: {
        method,
        headers,
        mode, // 添加 mode 属性
        body: method !== 'GET' && method !== 'DELETE' ? requestPayload : undefined,
        ...config,
      },
    };
  }

  /**
   * 响应拦截器
   */
  interceptorsResponse<T>(res: Response): Promise<T> {
    return new Promise((resolve, reject) => {
      const requestUrl = res.url;

      if (res.ok) {
        resolve(res.json() as Promise<T>);
      } else {
        res
          .clone()
          .text()
          .then((text) => {
            try {
              const errorData = JSON.parse(text);
              reject({ message: errorData || '接口错误', url: requestUrl });
            } catch {
              reject({ message: text, url: requestUrl });
            }
          });
      }
    });
  }

  async httpFactory<T>({ url = '', params = {}, method, mode, token }: Props): Promise<T> {
    const req = this.interceptorsRequest({
      url: this.baseURL + url,
      method,
      params: params.params,
      cacheTime: params.cacheTime,
      mode,
      token,
    });

    const res = await fetch(req.url, req.options);

    return this.interceptorsResponse<T>(res);
  }

  async request<T>(
    method: Method,
    url: string,
    params?: Params,
    mode?: RequestMode,
    token?: string,
  ): Promise<T> {
    return this.httpFactory<T>({ url, params, method, mode, token });
  }

  get<T>(url: string, params?: Params, mode?: RequestMode, token?: string): Promise<T> {
    return this.request('GET', url, params, mode, token);
  }

  post<T>(url: string, params?: Params, mode?: RequestMode, token?: string): Promise<T> {
    return this.request('POST', url, params, mode, token);
  }

  put<T>(url: string, params?: Params, mode?: RequestMode, token?: string): Promise<T> {
    return this.request('PUT', url, params, mode, token);
  }

  delete<T>(url: string, params?: Params, mode?: RequestMode, token?: string): Promise<T> {
    return this.request('DELETE', url, params, mode, token);
  }

  patch<T>(url: string, params?: Params, mode?: RequestMode, token?: string): Promise<T> {
    return this.request('PATCH', url, params, mode, token);
  }
}

const request = new Request(process.env.NEXT_PUBLIC_API_URL as string);

export default request;

export interface ApiResponse<T> {
  data: T;
  message: string;
  reason: string;
}

export const handleRequest = async <T>(requestFn: () => Promise<T>): Promise<T> => {
  try {
    return await requestFn();
  } catch (error) {
    console.error('Error processing request:', error);
    throw error;
  }
};
