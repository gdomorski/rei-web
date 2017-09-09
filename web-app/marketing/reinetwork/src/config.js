const Configs = {
	development: {
		devMode: 'development',
		apiHost: 'http://localhost:5000',
		cdnHost: 'https://s3.amazonaws.com/rei-today/web'
	},
	production: {
		brand: "REI Network",
		apiHost: 'https://forceserver-ggxrtioaew.now.sh',
		cdnHost: 'https://s3.amazonaws.com/rei-today/web'
	}
};

const isDevelopment = process.env.NODE_ENV === 'development'
export default Configs[process.env.NODE_ENV]
