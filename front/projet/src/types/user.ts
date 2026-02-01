export interface User {
  id: number;
  username: string;
  email: string | null;
  avatarUrl: string | null;
  createdAt: Date | string;
}

export interface AvatarUploadResponse {
  success: boolean;
  message?: string;
  user?: User;
  error?: string;
}
