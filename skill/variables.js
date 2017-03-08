'use strict';

exports.resources = (model)  => {
    return model.resources;
};
exports.error = (model) => {
    return model.resources.error;
};
exports.message = (model) => {
    return model.resources.message;
};
exports.answer = (model) => {
    return model.resources.answer;
};