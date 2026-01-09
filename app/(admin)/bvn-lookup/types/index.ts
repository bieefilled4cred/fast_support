export interface BvnRecord {
  bvn: string;
  phone_number1: string;
  phone_number2: string | null;
  first_name: string;
  last_name: string;
  middle_name: string;
  gender: string;
  date_of_birth: string;
  image: string;
}

export interface BvnLookupResponse {
  data: BvnRecord;
  isSuccessful: boolean;
  message: string;
  code: string;
}
