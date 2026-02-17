import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { GamificationStateView } from '../backend';
import { Principal } from '@icp-sdk/core/principal';

const GAMIFICATION_QUERY_KEY = ['gamification'];
const LEADERBOARD_QUERY_KEY = ['leaderboard'];

export function useGetCallerGamificationState() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<GamificationStateView | null>({
    queryKey: [...GAMIFICATION_QUERY_KEY, 'caller'],
    queryFn: async () => {
      if (!actor || !identity) return null;
      const principal = identity.getPrincipal();
      return actor.getGamificationState(principal);
    },
    enabled: !!actor && !actorFetching && !!identity,
  });
}

export function useGetLeaderBoard() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<[Principal, GamificationStateView][]>({
    queryKey: LEADERBOARD_QUERY_KEY,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeaderBoard(BigInt(100));
    },
    enabled: !!actor && !actorFetching && !!identity,
  });
}

export function useCompleteBossFight() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ earnedXp, chapter }: { earnedXp: bigint; chapter: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.completeBossFight(earnedXp, chapter);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GAMIFICATION_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: LEADERBOARD_QUERY_KEY });
    },
  });
}
