const querySchema = `
    allLocations: [Location]!
    locationsById(location_id: [String]!): [Location]!
    onUserWishlist(user_id: String!): [Location]!
`

export default querySchema;