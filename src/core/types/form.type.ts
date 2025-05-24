export interface ValidateErrorEntity {
  values: any;
  errorFields: {
    name: (string | number)[];
    errors: string[];
  }[];
  outOfDate: boolean;
}
