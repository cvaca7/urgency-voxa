'use strict';
const questions = require('./data/questions');
const audio = require('./data/alert.mp3');

let resources = {
    questions: questions['QUESTIONS_EN_US'],
    audio : audio
};

exports.register = (skill) => {

    skill.onIntent('LaunchIntent', (alexaEvent) => {


        return { reply:'Intent.Launch', to: 'entry' }
    });
};

function initialConfiguration(alexaEvent){
    alexaEvent.model.resources = resources;
}