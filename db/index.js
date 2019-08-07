var messages;
exports.connect = () => { messages = require('./ru.json'); };

exports.getMessage = (name) => {
    if (!messages[name]) {
        throw new Error('No such message' + name);
    }
    return messages[name];
}