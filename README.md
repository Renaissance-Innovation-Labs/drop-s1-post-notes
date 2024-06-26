# Post Notes

Welcome to Post Notes! This project aims to foster meaningful connections through the exchange of personal notes. Whether you want to appreciate someone, express concerns, or simply stay in touch, Post Notes provides a platform to do so constructively.

## Features

- **Pairing Requests**: Connect with friends, family, or colleagues by sending and accepting pairing requests.
- **Secure Messaging**: Enjoy private and secure note exchanges.
- **AI-Powered Sentiment Analysis**: Gain insights into the emotions behind the notes and receive actionable advice to maintain healthy relationships.
- **User-Friendly Interface**: Navigate easily through notes and pairing requests with our intuitive design.

## How It Works

1. **Sign Up**: Create your account.
2. **Send Pairing Requests**: Invite others to connect.
3. **Post Notes**: Share your thoughts, feelings, and feedback.
4. **AI Analysis**: Utilize AI to understand the sentiment and get suggestions for next actions.

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- Node.js
- npm
- Supabase account

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Renaissance-Innovation-Labs/drop-s1-post-notes.git
   ```
2. Navigate to the project directory:
    ```sh
    cd drop-s1-post-notes
    ```
3. Install dependencies:
   ```sh
     npm install
   ```

### Configuration

Create a .env.local file in the root directory and add your Supabase keys:
  ```sh
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
    RESEND_API_KEY=your_resend_api_key
    OPENAI_API_KEY=your_openai_api_key
  ```

### Running the App

1. Start the development server:
   ```sh
     npm run dev
   ```
2. Open http://localhost:3000 to view it in your browser.

### Usage

- Send Pairing Requests: Navigate to the Pairings Requests section and click on 'Send Pair Request'.
- Post Notes: After pairing, start sharing notes by clicking 'Send new note'.
- AI Analysis: View AI-generated insights and suggestions in your notes.

### Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.
Feel free to customize this template further based on your specific needs and additional features.
