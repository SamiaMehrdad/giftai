const questions = [
    {
        title: "Name",
        fullQuestion: "What’s the lucky recipient’s name? ",
        imageUrl: "/gift-name.png",
        comment: "Let’s not mess this up!",
    },
    {
        title: "Birthday",
        fullQuestion: "When is their birthday, or how old are they?",
        imageUrl: "/gift-birth.png",
        comment: "Pick a date or estimate their age—it’s all good!",
        inputType: "date",
    },
    {
        title: "Occasion",
        fullQuestion: "What’s the big deal? ",
        imageUrl: "/gift-celeb.png",
        comment: "Pick the occasion we’re celebrating!",
        common: ["Birthday", "New Year", "Wedding", "Thank You"],
        inputType: "category",
        categories: [
            {
                category: "Seasonal & Holidays",
                options: ["Christmas", "Valentine’s Day", "Easter", "Halloween"],
            },
            {
                category: "Life Achievements",
                options: ["Promotion", "First Job", "Graduation", "Retirement"],
            },
            {
                category: "Miscellaneous Fun",
                options: ["Just Because", "Friendship Day", "Pet Adoption Day"],
            },
        ],
    },
    {
        title: "Relationship",
        fullQuestion: "Who’s this superstar in your life? ",
        imageUrl: "/gift-relation.png",
        comment: "Friend? Family? Someone special?",
        inputType: "category",
        categories: [
            {
                category: "Family",
                options: ["Mom", "Dad", "Sis", "Bro", "Daughter", "Son"],
            },
            {
                category: "2nd Family",
                options: ["Grandma", "Grandpa", "Aunt", "Uncle", "Cousin", "Nephew", "Niece"],
            },
            {
                category: "Friends",
                options: ["Bestie", "BFF", "Roomie", "Work Buddy", "Friend"],
            },
            {
                category: "Significant Other",
                options: ["Girlfriend", "Boyfriend", "Fiance", "Spouse", "Partner", "Love"],
            },
        ],
        //common: ["Friend", "Colleague", "Other"],
    },
    {
        title: "Tone",
        fullQuestion: "What vibe are we going for?",
        imageUrl: "/gift-formal.png",
        comment: "Playful, romantic, or full-on serious?",
        inputType: "button",
        options: ["Comic", "Friendly", "Playful", "Formal", "Romantic", "Inspirational"],
    },
    {
        title: "Hobbies",
        fullQuestion: "What makes this person tick?",
        imageUrl: "/gift-hobby.png",
        comment: "Hobbies, interests, or guilty pleasures?",
        //inputType: "text",
        allowIgnore: true,
    },
    {
        title: "Color",
        fullQuestion: "What’s their all-time favorite color?",
        imageUrl: "/gift-color.png",
        comment: "Let’s get this rainbow right!",
        options: ["Red", "Blue", "Green", "Yellow", "Pink", "Purple", "Orange"],
        colors: ["#833", "#06f", "#0b4", "#cc0", "#c88", "#50c", "#a60"],
        inputType: "button",
        allowIgnore: true,
    },
    {
        title: "Notes",
        fullQuestion: "Got any juicy details or inside jokes?",
        imageUrl: "/gift-laugh.png",
        comment: " Spill the tea!",
        inputType: "textarea",
        allowIgnore: true,
    },
    {
        title: "Style",
        fullQuestion: "Do you want this gift to be realistic, wildly imaginative, or both?",
        imageUrl: "/gift-real.png",
        comment: "Choose a style that reflects the recipient’s preferences.",
        options: ["Realistic", "Fantasy", "Creative", "Traditional"],
        inputType: "button",
    },
];

export default questions;
