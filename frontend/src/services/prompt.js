const generatePrompt = {
    // Function to generate the prompt
    song: (params) => {
        const {
            Name, //mandatory
            Birthday = "Ignore",
            Occasion, //mandatory
            Relationship, //mandatory
            Tone, //mandatory
            Hobbies = "Ignore",
            Color = "Ignore",
            Notes = "Ignore",
            Style = "Ignore",
        } = params;

        // Constructing the prompt
        let prompt = "Create a " + (Style !== "Ignore" ? Style : "") + " " + Tone;
        prompt += ["comic", "friendly", "playful"].includes(Tone) ? " song" : " poem";
        prompt += ` about ${Name} who is my ${Relationship}`;
        // Adding specific details
        if (Birthday !== "Ignore") prompt += ` born on ${Birthday}${Birthday.includes("years") ? " ago" : ""}`;

        prompt += ` for the occasion of ${Occasion}`;

        // Adding personalized elements
        const personalizedElements = [];
        if (Hobbies !== "Ignore") personalizedElements.push(`likes ${Hobbies}`);
        if (Color !== "Ignore") personalizedElements.push(`loves the color ${Color}`);
        if (Notes !== "Ignore") personalizedElements.push(Notes);

        if (personalizedElements.length > 0) {
            prompt += ". Include details such as " + personalizedElements.join(", ") + ".";
        }

        // Final touches
        prompt += " Make it heartfelt and meaningful.";

        return prompt;
    },
};

export default generatePrompt;
