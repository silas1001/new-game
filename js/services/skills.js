/**
 * Created by Tarnos on 2017-02-27.
 */


// SKILLS

//Each skill is an object, with methods such us "unlockNextSkill", which
//will be used with skill requirements. i.e.: FireBall.level >= 5 ==> FireBlast.isUnlocked = true;
//This will make skill trees easier to work with.
//Might use something else to make it more readable, FireBlast.requirements.fireBall() >>
//>>Check if fireball has reached a proper level, or even make a json with requirements.
//"Fireblast: requirements: [["fireball", 5], ["Magic mastery", 5]];, nested array = name <=> level