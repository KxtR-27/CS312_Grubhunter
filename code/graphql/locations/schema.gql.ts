import gql from "graphql-tag";

import locationTypeDefsCustom from "graphql/locations/custom.gql";
import locationTypeDefsQueries from "graphql/locations/queries.gql";
import locationTypeDefsMutations from "graphql/locations/mutations.gql";

const gqlSchema = gql`
    ${locationTypeDefsCustom}

    type Query {
        ${locationTypeDefsQueries}
    }

    type Mutation {
        ${locationTypeDefsMutations}
    }
`

export default gqlSchema;