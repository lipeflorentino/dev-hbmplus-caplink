const logger = require('../logger/logger');

function receiveSignal(req, res) {
    const { signal } = req.body;
    const message = `Signal received: ${signal}`;
    logger.info((`################## ${message} ######################`));
    logger.info((`################## ${message} ######################`));
    res.status(200).json(message);
}

module.exports = {
    receiveSignal,
}
