// script.js
function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    // Display user's message
    const userMessage = document.createElement("div");
    userMessage.className = "message user";
    userMessage.textContent = userInput;
    document.getElementById("chat-box").appendChild(userMessage);
    document.getElementById("user-input").value = "";

    // Generate bot response
    botResponse(userInput);
}

function botResponse(input) {
    let botMessageText = "I'm here to help!";

    // Basic response logic with keywords
    input = input.toLowerCase(); // Convert input to lowercase for easy comparison

    if (input.includes("hello") || input.includes("hi")) {
        botMessageText = "Hi there! How can I assist you today?";
    } else if (input.includes("how are you")) {
        botMessageText = "I'm just a bot, but I'm here and ready to help!";
    } else if (input.includes("time")) {
        const currentTime = new Date().toLocaleTimeString();
        botMessageText = `The current time is ${currentTime}.`;
    } else if (input.includes("weather")) {
        botMessageText = "I can't check the weather, but maybe a weather app could help!";
    } else if (input.includes("name")) {
        botMessageText = "I'm your friendly assistant bot!";
    } else if (input.includes("bye")) {
        botMessageText = "Goodbye! Have a great day!";
    } else if (input.includes("joke")) {
        botMessageText = "Why don’t scientists trust atoms? Because they make up everything!";
    } else if (input.includes("add") || input.includes("+")) {
        const numbers = extractNumbers(input);
        if (numbers.length === 2) {
            botMessageText = `The result is ${numbers[0] + numbers[1]}.`;
        } else {
            botMessageText = "Please provide two numbers to add.";
        }
    } else if (input.includes("subtract") || input.includes("-")) {
        const numbers = extractNumbers(input);
        if (numbers.length === 2) {
            botMessageText = `The result is ${numbers[0] - numbers[1]}.`;
        } else {
            botMessageText = "Please provide two numbers to subtract.";
        }
    } else {
        botMessageText = "I'm not sure how to respond to that, but I'm learning!";
    }

    // Display bot's message
    const botMessage = document.createElement("div");
    botMessage.className = "message bot";
    botMessage.textContent = botMessageText;
    document.getElementById("chat-box").appendChild(botMessage);
}

// Helper function to extract numbers from the user's input
function extractNumbers(input) {
    const numbers = input.match(/\d+/g); // Find all numbers in the input
    return numbers ? numbers.map(Number) : []; // Convert them to integers and return
}
