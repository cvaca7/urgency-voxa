'use strict';
const questions = require('./data/questions');

let resources = {
    questions: questions['QUESTIONS_EN_US'],
    currIndex : 0
};

exports.register = (skill) => {

    skill.onIntent('LaunchIntent', (alexaEvent) => {
        alexaEvent.model.resources = resources;
        return { reply: 'Intent.Launch', to: 'optionsReview' };

    });
    skill.onState('optionsReview', (alexaEvent) => {
        console.log(alexaEvent.intent.name);

        if (alexaEvent.intent.name === 'AMAZON.YesIntent') {
            const index = 0;
            const shuffle = 0;
            const loop = 0;
            const offsetInMilliseconds = 0;
            const url = 'https://s3.amazonaws.com/mp3tests/Red+Alert-SoundBible.com-108009997.mp3';
            const directives = buildPlayDirective(url, index, shuffle, loop, offsetInMilliseconds);

            let data = alexaEvent.model.resources, currIndex = data.currIndex, questions = data.questions;
            let currQuestionObj = questions[currIndex], answers = Object.values(currQuestionObj)[0];
            let spokenQuestion = Object.keys(currQuestionObj)[0], spokenAnswer = generateResponse(answers);

            let speechOut = spokenQuestion + '. ' + spokenAnswer;
            alexaEvent.model.resources.message = speechOut;
            console.log('speechOut',speechOut);

            return { reply:'Intent.PlayAudio', to: 'optionsReview' , directives }

        } else if (alexaEvent.intent.name === 'AMAZON.NoIntent') {
            return { reply: 'Intent.Exit', to: 'die' };
        }
    });

    skill.onIntent('AnswerIntent', (alexaEvent) => {
        let res = alexaEvent.intent.params;
        console.log(res.Number);
        alexaEvent.model.resources.answer = res.Number;

        const directives = buildStopDirective();

        return { reply: 'Intent.doSomething', to: 'die', directives  }; //
    });

};

function generateResponse(answers){
    let res = "";
    for(var i = 0; i < answers.length; i++){
        res += `${i + 1}. ${answers[i]}. `;
    }
    return res;
}

function buildPlayDirective(url, index, shuffle, loop, offsetInMilliseconds) {
    const directives = {};
    directives.type = 'AudioPlayer.Play';
    directives.playBehavior = 'REPLACE_ALL';
    directives.token = createToken(index, shuffle, loop);
    directives.url = url;
    directives.offsetInMilliseconds = offsetInMilliseconds;

    return directives;
}

function buildStopDirective() {
    const directives = {};
    directives.type = 'AudioPlayer.Stop';

    return directives;
}

function createToken(index, shuffle, loop) {
    return JSON.stringify({ index, shuffle, loop });
}