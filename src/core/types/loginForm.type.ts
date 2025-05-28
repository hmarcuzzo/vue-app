export interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

export interface ValidateErrorEntity {
  values: any;
  errorFields: {
    name: (string | number)[];
    errors: string[];
  }[];
  outOfDate: boolean;
}
