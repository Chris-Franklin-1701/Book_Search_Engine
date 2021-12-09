import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            savebook {
                _id
                authors
                description
                image
                link
                title
            }
        }
    }
`;