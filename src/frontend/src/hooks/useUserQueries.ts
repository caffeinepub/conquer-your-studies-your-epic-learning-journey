import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { UserProfile } from '../backend';
import { Principal } from '@icp-sdk/core/principal';

const USER_PROFILES_QUERY_KEY = ['userProfiles'];

export function useGetAllUserProfiles() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<[Principal, UserProfile]>>({
    queryKey: USER_PROFILES_QUERY_KEY,
    queryFn: async () => {
      if (!actor) return [];
      // Get all gamification states to get all user principals
      const gamificationStates = await actor.getAllGamificationStates();
      
      // Fetch profiles for each user
      const profiles: Array<[Principal, UserProfile]> = [];
      for (const [principal] of gamificationStates) {
        try {
          const profile = await actor.getUserProfile(principal);
          if (profile) {
            profiles.push([principal, profile]);
          }
        } catch (error) {
          // Skip users without profiles or access errors
          console.warn('Could not fetch profile for', principal.toString());
        }
      }
      
      return profiles;
    },
    enabled: !!actor && !isFetching,
  });
}
