# Personalized Gift Generator

A web application to create fully customized personal gifts using OpenAI API. The app allows users to input details about the recipient and occasion to generate unique text (songs or poems) and related images, which can be fine-tuned and downloaded or printed on physical products.

---

## Project Structure

This is a MERN stack application:

- **Client**: React-based frontend for user interaction.
- **Server**: Node.js/Express backend for handling OpenAI API calls and business logic.
- **Database**: MongoDB to store user data, generated gifts, and preferences.

---

## Features

1. **User Input**:

   - Collect recipient's details (e.g., name, DOB, interests, relationship).
   - Ask about the occasion (e.g., birthday, anniversary) and tone (friendly, formal, etc.).
   - Allow customization preferences like realistic or fantasy themes.

2. **Content Generation**:

   - Use OpenAI API to generate personalized text (song/poem).
   - Create a related image using DALL·E or another AI tool.

3. **Customization**:

   - Let users adjust parameters like tone, style, and length.
   - Provide a live preview of text and image.

4. **Final Product**:
   - Combine the finalized text and image into a downloadable file.
   - Optionally print designs on products like mugs or hats.

---

## Data Parameters

### **Gift Recipient Details**

- **Name** (Required)
- **Date of Birth** (Optional)
- **Gender** (Optional)
- **Relationship to User** (Required)
- **Interests/Hobbies** (Required)
- **Personality Traits** (Optional)
- **Profession** (Optional)
- **Cultural/Religious Preferences** (Optional)

### **Occasion Details**

- **Type of Occasion** (Required)
- **Date of Occasion** (Optional)
- **Significance of Occasion** (Optional)
- **Tone** (Required)

### **Gift Customization Preferences**

- **Realistic vs. Fantasy** (Required)
- **Theme/Style** (Optional)
- **Favorite Colors/Visual Style** (Optional)
- **Specific Requests/Keywords** (Optional)
- **Language** (Optional)
- **Length** (Optional)

### **Optional Fun Add-ons**

- **Favorite Quotes/Songs** (Optional)
- **Memorable Shared Moments** (Optional)
- **Inspirations** (Optional)

---

## Setup Instructions

### **Prerequisites**

- Node.js and npm installed.
- MongoDB setup (local or Atlas).
- OpenAI API key.

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/personalized-gift-generator.git
   cd personalized-gift-generator
   ```
