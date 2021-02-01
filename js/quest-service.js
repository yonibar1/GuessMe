var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
const KEY = 'tree'

function createQuestsTree() {
    if (!loadFromStorage(KEY)) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
        saveToStorage(KEY, gQuestsTree)
    } else {
        gQuestsTree = loadFromStorage(KEY)
    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // TODO: update the gPrevQuest, gCurrQuest global vars
    // console.log(loadFromStorage(KEY));
    gPrevQuest = gCurrQuest
    gCurrQuest = gCurrQuest[res]

}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    gLastRes = lastRes
    gCurrQuest.txt = newQuestTxt
    gCurrQuest.yes = createQuest(newGuessTxt)
    gCurrQuest.no = createQuest(lastRes)
    saveToStorage(KEY, gQuestsTree)
    // TODO: Create and Connect the 2 Quests to the quetsions tree
}

function getCurrQuest() {
    return gCurrQuest
}
