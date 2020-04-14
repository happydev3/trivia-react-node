
const funcS = () => {
	switch(process.env.NODE_ENV) {
		case 'production':
			return "http://trelloforest.herokuapp.com"
		case 'development':
			return "http://localhost:8000"
		default:
			return 'http://localhost:8000'
	}
}
// export SERVER_PORT;
export const SERVER_PORT = funcS();
