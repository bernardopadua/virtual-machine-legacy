export default class BoundLink {
	static poolChannel = [];

	static openChannel(channel, pCallback) {
		BoundLink.poolChannel[channel] = {data: null, callback: pCallback};
	}

	static callReverse(channel){
		BoundLink.poolChannel[channel].callback();
	}

	static setData(channel, data){
		BoundLink.poolChannel[channel].data = data;
	}

	static getData(channel){
		return BoundLink.poolChannel[channel].data;
	}

	static setDataCall(channel, data){
		BoundLink.poolChannel[channel].data = data;
		BoundLink.poolChannel[channel].callback();
	}
}

module.exports = BoundLink;