# Tic-Tac-Toe React Project

A simple Tic-Tac-Toe game built with React, featuring both Player vs. Player and Player vs. AI modes. The AI comes with adjustable difficulty levels (easy, medium, hard). The game includes sound effects and a responsive UI.

## Features

- **Player vs. Player**: Play with another person locally.
- **Player vs. AI**: Play against an AI with adjustable difficulty levels:
  - **Easy**: Random moves.
  - **Medium**: AI blocks winning moves and tries to win.
  - **Hard**: AI uses the Minimax algorithm for perfect play.
- **Responsive Design**: The game adapts to various screen sizes.
- **Game Reset**: Option to reset the game at any point.
- **Winner Highlight**: The winning line is visually highlighted.

## Demo

You can play the game directly from the deployed link below:

**[Play Tic-Tac-Toe on GitHub Pages](https://diegotalaveracampos.github.io/unique_tic-tac-toe_game)**

## Requirements

- React 18+
- Tailwind CSS for styling
- `lucide-react` icons (for UI elements like buttons)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repository-name.git
   cd your-repository-name
2. Install dependencies::
   ```bash
   npm install
3. Start the development server:
   ```bash
   npm start
## How to Play
Click on any empty square to place your move.
The game alternates between X and O.
If AI mode is enabled, the AI will make a move after your turn.
The first player to align three of their marks horizontally, vertically, or diagonally wins.
In case of a draw, the game will notify you when no moves are left.
AI Logic
- Easy Mode: The AI picks a random available square.
- Medium Mode: The AI tries to block you from winning and will attempt to make winning moves.
- Hard Mode: The AI uses the Minimax algorithm, which explores all possible moves and selects the optimal one to maximize its chances of winning or minimize the chances of losing.
## App Structure

## State Variables:

- board: Represents the 3x3 grid of the Tic-Tac-Toe board.
- xIsNext: Boolean flag indicating whether it’s 'X' or 'O' turn.
- winner: Stores the winner ('X', 'O', or null for no winner).
- winningLine: Array of indices representing the winning line on the board.
- isAIMode: Boolean flag indicating whether AI is enabled.
- difficulty: Stores the difficulty level of the AI.
- showModal: Controls the visibility of the AI difficulty selection modal.

## Main Functions:

-handleClick: Handles player moves, checks for winners, and updates the board.
-minimax: The algorithm used in Hard mode to evaluate the best move for the AI.
-calculateWinner: Checks if there is a winner after a move.
-renderSquare: Renders individual squares on the board.
-toggleAI: Toggles the AI mode and opens the difficulty selection modal.

## Dependencies
- react: JavaScript library for building user interfaces.
- lucide-react: Icon library for UI elements.
- tailwindcss: Utility-first CSS framework.
