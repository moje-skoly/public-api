/**
 * These tests should test the ability to connect to the DB server.
 */

import connect from '../src/db/connect.js';

describe('Connecting to MongoDB', () => {
	it('must work', (done) => {
		var db = connect();
		db.on('error', () => { throw new Error('DB connection failed'); });
		db.on('open', done);
	});
});