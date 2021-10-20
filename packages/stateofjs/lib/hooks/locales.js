import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const localesQuery = `query LocalesQuery {
  locales{
    id
    label
    translators
    repo
    translatedCount
    totalCount
    completion
  }
}
`;

export const useLocales = () => {
  const { loading, data = {} } = useQuery(gql(localesQuery));
  const { locales } = data;
  return { loading, locales };
};
