function receiveSignal(req, res) {
    const { signal } = req.body;
    console.log(('################## Signal received ######################'));
    console.log(`Signal received: ${signal}`);
    console.log(('################## Signal received ######################'));
    res.status(200).send('################## Signal received ######################');
}

module.exports = {
    receiveSignal,
}
