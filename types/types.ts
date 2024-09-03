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

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
