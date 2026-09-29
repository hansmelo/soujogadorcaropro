import type { PlayerCardData } from '@/components/PlayerCard';

export const SAMPLE_PLAYER: PlayerCardData = {
  ovr: 94,
  name: 'Lucas Souza',
  username: '@lucas_camisa10',
  position: 'Meia Atacante',
  category: 'Sub-20',
  jerseyNumber: '10',
  followers: '45.2K',
  engagement: '8.4%',
  reach: '180K',
  sponsorship: 'R$ 570',
  passValue: 'R$ 19.900',
};

export const SAMPLE_PLAYER_FULL: PlayerCardData = {
  ovr: 88,
  name: 'Pedro Oliveira',
  username: '@pedro_paredao',
  position: 'Goleiro',
  category: 'Sub-17',
  jerseyNumber: '1',
  followers: '22K',
  engagement: '8.4%',
  reach: '87.6K',
  fieldStats: { goals: 2, assists: 6, trophies: 4 },
  sponsorship: 'R$ 280',
  passValue: 'R$ 15.600',
};
