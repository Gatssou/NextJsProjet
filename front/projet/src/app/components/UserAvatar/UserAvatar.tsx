'use client';

import { User } from '@/types/user';

interface UserAvatarProps {
  user: User;
  size?: number;
}

export default function UserAvatar({ user, size = 48 }: UserAvatarProps) {
  return (
    <div
      className="relative rounded-full overflow-hidden bg-slate-700 flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {user.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-white font-bold">
          {user.username.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}
