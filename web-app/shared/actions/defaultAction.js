export const defaultAction = (type, data) => {

	let payload = (typeof data === 'undefined') ? null : data
	return { type, payload };
}
