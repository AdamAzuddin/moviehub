// src/types/type.ts

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
  email: string
}