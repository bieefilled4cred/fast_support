import { Application } from "./applications";

export type InviteUserPayload = {
  email: string;
  phoneNumber: string;
  lastName: string;
  firstName: string;
  otherName: string;
  departmentId: string;
  role: string;
  appId: string;
};

export type UpdateUserPayload = {
  email: string;
  phoneNumber: string;
  lastName: string;
  firstName: string;
  otherName: string;
  departmentId: string;
  role: string;
  appId: string;
};

export type User = {
  id: string;
  lastName: string;
  firstName: string;
  otherName?: string;
  phoneNumber: string;
  email: string;
  username: string;
  defaultRole: string | null;
  userType: string;
  status: string;
  departmentId: string;
  role?: string;
  roles?: string[];
  createdDate?: string;
  appId?: string;
  apps?: Application[];
};

export type UserProfile = User;

export interface UsersQueryParams {
  startDate?: string;
  endDate?: string;
  status?: string;
  role?: string;
  pageNumber?: number;
  pageSize?: number;
  searchKeyword?: string;
}

export type UserDetails = {
  id: string;
  role: string;
  userName: string;
  userEmail: string;
  image?: string;
  status: string;
  dateCreated: string;
};
