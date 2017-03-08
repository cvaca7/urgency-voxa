'use strict';
 let timeBreak = '<break time="3s"/>';
const views = (() => {

    return {
        Intent : {
            Launch : {
                ask : `Welcome to Urgency game, you will walk through some places, 
                see if you can survive, got 5 seconds to answer, 
                if not, you are not going to make it! 
                Would you like to start?`,
                reprompt: 'Would you like to start?'
            },
            PlayAudio: {
                ask: '{message}' + timeBreak + '.'
            },
            doSomething: {
                tell: 'You save your ass telling: {answer}'
            },
            Exit: {
                tell: 'Ok, bye!'
            },
        }
    }
} )();

module.exports = views;