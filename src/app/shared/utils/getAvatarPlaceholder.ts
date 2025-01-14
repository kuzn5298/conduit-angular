const getPlaceholderURL = (username: string = '') =>
  `https://avatar.iran.liara.run/public/boy?username=${username}`;

export const getAvatarPlaceholder = (
  image: string | null,
  username?: string
): string => {
  return image || getPlaceholderURL(username);
};
