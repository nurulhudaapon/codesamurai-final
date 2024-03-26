// Cube.js configuration options: https://cube.dev/docs/config

/**
 * @type {import("./cube.types").CubejsConfiguration}
 */
module.exports = {
	queryRewrite: (query, { securityContext }) => {
		if (!securityContext) {
			throw new Error('Unauthenticated');
		}

		return query;
	},
	checkSqlAuth: (req, user_name, password) => {
		const staffSecurityContext = {
			role: 'admin',
			sub: 'admin',
		};

		if (user_name === 'cube') {
			return {
				password,
				securityContext: staffSecurityContext,
			};
		}

		return {
			securityContext: staffSecurityContext,
		};

		throw new Error('Access denied');
	},
};