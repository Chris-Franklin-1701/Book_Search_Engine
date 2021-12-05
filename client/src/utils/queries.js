import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!){
        user(username: $username) {
            _id
            username
            email
        }
    }
`;

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            books {
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

export const QUERY_BOOKS = gql`
    query books {
        books {
            _id
            title
            authors
            description
            image
            link
            username
        }
    }
`;