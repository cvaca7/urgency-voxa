'use strict';
const questions = require('./data/questions');

let resources = {
    questions: questions['QUESTIONS_EN_US']
};

exports.register = (skill) => {

    skill.onIntent('LaunchIntent', (alexaEvent) => {


        return { reply:'Intent.Launch', to: 'entry' }
    });
};

function initialConfiguration(alexaEvent){
    alexaEvent.model.resources = resources;
}