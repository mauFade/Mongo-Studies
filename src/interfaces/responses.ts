interface ISuccess {
  success: boolean;
  data: any;
}

interface IError {
  message: string;
  error: any;
}

export { ISuccess, IError };
