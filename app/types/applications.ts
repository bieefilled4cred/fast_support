export type Application = {
  appId: string;
  name: string;
  description: string;
  logo: string;
  url: string;
  createdDate: string;
};

export type CreateApplicationPayload = {
  name: string;
  description: string;
  logo: string;
  url: string;
};

export type ApplicationUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
};
