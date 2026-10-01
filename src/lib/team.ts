import { getCollection, type CollectionEntry } from 'astro:content';

/** Display order for the homepage grid and the bio pages' previous/next links. Unlisted members go last, by name. */
const TEAM_ORDER = ['saleem-jaffer', 'fayaadh-dhansay', 'dinesh-makan', 'isa-tippens', 'imaad-davies'];

export async function getSortedTeam(): Promise<CollectionEntry<'team'>[]> {
  const team = await getCollection('team');
  const rank = (slug: string) => {
    const index = TEAM_ORDER.indexOf(slug);
    return index === -1 ? TEAM_ORDER.length : index;
  };
  return team.sort((a, b) => rank(a.data.slug) - rank(b.data.slug) || a.data.name.localeCompare(b.data.name));
}
