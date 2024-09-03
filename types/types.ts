// src/types/type.ts

import { ReactNode } from "react";

export interface FormInputProps {
    id: string;
    type: 'text' | 'email' | 'password';
    placeholder?: string;
    required?: boolean;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  

export interface Users{
  username: string,
  email: string,
  uid:string,
  profilePic?: string
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface ProfileAvatarProps {
  profilePicUrl?: string;
  altText?: string;
}

export interface AuthProviderProps {
  children: ReactNode; // Include children prop
}