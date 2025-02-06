import { Profile } from '../../../shared/model';

export const getOptimisticProfile = (profile: Profile): Profile => {
  const newFollowing = !profile.following;
  const optimisticProfile = {
    ...profile,
    following: newFollowing,
  };
  return optimisticProfile;
};
