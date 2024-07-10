const logger = require('../logger/logger');

function receiveSignal(req) {
    const { signal } = req.body;
    const message = `Signal received: ${signal}`;
    logger.info((`################## ${message} ######################`));
    logger.info((`################## ${message} ######################`));
    return message;
}

module.exports = {
    receiveSignal,
}
