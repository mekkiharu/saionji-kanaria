const greetingsIndex = {
  "casualGreets": [
    {
      "id": 0,
      "description": "casual long greetings",
      "greets": ["hello", "hallo", "sup", "owo7", "o/", "whats up", "what's up", "what up", "howdy", "ahoy"]
    },
    {
      "id": 1,
      "description": "casual short greetings",
      "greets": ["hi", "yo", "nyow", "hiya", "heya"]
    }
  ],
  "timeOfDayGreets": [
    {
      "id": "morning",
      "greets": ["good morning", "gmorning"],
      "singleGreet": "morning"
    },
    {
      "id": "afternoon",
      "greets": ["good afternoon", "g'afternoon"],
      "singleGreet": "afternoon"
    },
    {
      "id": "eve",
      "greets": ["good evening", "g'evening"],
      "singleGreet": "evening"
    },
    {
      "id": "night",
      "greets": ["nini", "night night", "good night"],
      "singleGreet": "night"
    }
  ],
  "timeOfDayReplies": [
      'good meowning!',
      'good nyafternoon!',
      'good meovening!',
      'night nyaight!'
  ]
}

export default greetingsIndex;