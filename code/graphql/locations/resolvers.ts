import { locationMutations } from "./mutations";
import { locationQueries } from "./queries";

const resolvers = {
	Query: {
		...locationQueries,
	},
	Mutation: {
		...locationMutations,
	},
};

export default resolvers;
