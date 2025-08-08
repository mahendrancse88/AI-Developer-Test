# AI-Powered E-commerce Catalog

## Overview
This is a simple React-based product catalog app that demonstrates integrating AI to enhance user experience.  
Users can search products naturally using plain English queries like:  
*“Show me running shoes under $100 with good reviews”*  
The app uses OpenAI's GPT-4o-mini model to parse the natural language query and extract product filters (category, max price, minimum rating), then filters the static product list accordingly.

---

## Features
- Displays a static list of 8 sample products with name, price, category, description, and rating.
- Natural language search powered by OpenAI API for smart filtering.
- Local filtering of products based on AI-extracted criteria.
- Simple and clean UI with search input and results.

---

## How to Run

### Prerequisites
- Node.js and npm installed
- OpenAI API key (sign up at [platform.openai.com](https://platform.openai.com/))

### Steps

1. Clone the repo:
   ```bash
   git clone <your-repo-url>
   cd ai-ecommerce
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. **Important:** For security, set up a backend proxy server to keep your OpenAI API key secret.  
   For quick testing, you may temporarily paste your API key in `src/App.js` but **this is NOT secure for production**.

4. Start the React app:
   ```bash
   npm start
   ```

5. Open your browser at [http://localhost:3000](http://localhost:3000)  
   Try queries like:  
   - `running shoes under $100 with good reviews`  
   - `electronics under 90`  
   - `accessories with rating above 4`  
   - `yoga mat`

---

## AI Feature Details
- Uses OpenAI Chat Completion API (`gpt-4o-mini` model) to parse natural language input.
- Extracts filter criteria: `category`, `maxPrice`, and `minRating` in JSON format.
- Frontend applies filters locally on a static product catalog.

---

## Tools / Libraries Used
- React (Create React App)
- Axios (HTTP client)
- OpenAI API (for NLP search parsing)

---

## Assumptions
- Product catalog is static JSON for simplicity.
- OpenAI API key usage is done in frontend only for demo; in real apps, use a backend to keep the key secure.
- The NLP model output parsing is basic and may not cover all query variations.

---

## Optional: Integrating Blockchain Features (Bonus)
AI-enhanced product recommendations or pricing can be combined with blockchain for added value:  
- Token-gated pricing models where only verified token holders access discounts.  
- On-chain user preferences stored securely and transparently.  
- Loyalty programs implemented as smart contracts rewarding engagement with tokens.

---

## License
MIT

---

If you want help setting up a secure backend proxy for OpenAI API or deploying the app, feel free to ask!
