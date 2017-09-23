var express = require("express");
var path = require("path");
var router = express.Router();
var friendsList = require('../data/friends.js');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.post('/api/friends', function(req, res) {
    let newSurvey = req.body;
    let pickedFriend;
    let friendCalc = [];
    for (var i = 0; i < friendsList.length; i++) {
        var totalDifference = 0;
        for (var k = 0; k < 10; k++) {
            let scoreDiff = Math.abs(friendsList[i].scores[k] - newSurvey.scores[k]);
            totalDifference += scoreDiff;
        }
        friendCalc.push({
            name: friendsList[i].name,
            picture: friendsList[i].picture,
            totalDiff: totalDifference
        });
    }
    let maxScore = 40;
    friendCalc.map(function(obj) {
        if (obj.totalDiff < maxScore) maxScore = obj.totalDiff;
    });
    pickedFriend = friendCalc.filter(function(e) { return e.totalDiff == maxScore; });

    res.json(pickedFriend);
    friendsList.push(newSurvey);

});

router.get('/api/friends', function(req, res) {
    res.json(friendsList);
});

module.exports = router;