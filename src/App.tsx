import React, { useState, useEffect } from 'react';
import { RefreshCw, X } from 'lucide-react';

const App: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [isAIMode, setIsAIMode] = useState(false);
  const [difficulty, setDifficulty] = useState<string>('easy');
  const [showModal, setShowModal] = useState(false);

  const playSound = () => {
    const audio = new Audio('src/assets/click_sound.mp3');
    audio.play();
  };

  useEffect(() => {
    if (!xIsNext && isAIMode && !winner) {
      const emptySquares = board.reduce<number[]>((acc, square, index) => {
        if (!square) acc.push(index);
        return acc;
      }, []);
  
      if (emptySquares.length === 0) return;
  
      setTimeout(() => {
        let aiMove: number = -1;
        if (difficulty === 'easy') aiMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        else if (difficulty === 'medium') aiMove = getMediumAIMove(emptySquares);
        else if (difficulty === 'hard') aiMove = getHardAIMove();
  
        handleClick(aiMove);
      }, 1000); // 2 seconds delay
    }
  }, [xIsNext, isAIMode, winner, board, difficulty]);
  

  const getMediumAIMove = (emptySquares: number[]): number => {
    const opponent = xIsNext ? 'X' : 'O';

    for (let i = 0; i < emptySquares.length; i++) {
      const move = emptySquares[i];
      const newBoard = [...board];
      newBoard[move] = opponent;
      if (calculateWinner(newBoard)) {
        return move;
      }
    }

    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  };

  const getHardAIMove = (): number => {
    return minimax(board, xIsNext ? 'X' : 'O').index;
  };

  const minimax = (board: (string | null)[], player: string): { index: number; score: number } => {
    const opponent = player === 'X' ? 'O' : 'X';
    const winner = calculateWinner(board);
    const emptySquares = board.reduce<number[]>((acc, square, index) => {
      if (!square) acc.push(index);
      return acc;
    }, []);

    if (winner && winner.winner === 'X') return { score: -1, index: -1 };
    if (winner && winner.winner === 'O') return { score: 1, index: -1 };
    if (emptySquares.length === 0) return { score: 0, index: -1 };

    const moves: { index: number; score: number }[] = [];
    emptySquares.forEach((index) => {
      const newBoard = [...board];
      newBoard[index] = player;
      const result = minimax(newBoard, opponent);
      moves.push({ index, score: result.score });
    });

    let bestMove: { index: number; score: number } | undefined;
    if (player === 'O') {
      let bestScore = -Infinity;
      moves.forEach((move) => {
        if (move.score > bestScore) {
          bestScore = move.score;
          bestMove = move;
        }
      });
    } else {
      let bestScore = Infinity;
      moves.forEach((move) => {
        if (move.score < bestScore) {
          bestScore = move.score;
          bestMove = move;
        }
      });
    }
    return bestMove || { index: -1, score: 0 };
  };

  const calculateWinner = (squares: (string | null)[]): { winner: string; line: number[] } | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a]!, line: [a, b, c] };
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (winner || board[i]) return;

    // Play sound always when the player clicks (AI mode or not)
    playSound();

    const nextBoard = [...board];
    nextBoard[i] = xIsNext ? 'X' : 'O';
    const result = calculateWinner(nextBoard);
    setBoard(nextBoard);

    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
    } else {
      setWinner(null);
      setWinningLine([]);
    }

    setXIsNext(!xIsNext);
  };

  const renderSquare = (i: number) => {
    const highlight = winningLine && winningLine.includes(i) ? 'bg-green-300' : '';
    const color = board[i] === 'X' ? 'text-red-500' : 'text-blue-500';
    const noHover = winningLine && winningLine.includes(i) ? 'no-hover' : '';
    return (
      <button
        className={`w-full h-24 sm:h-30 bg-gray-200 rounded-lg flex items-center justify-center text-2xl sm:text-4xl font-bold focus:outline-none ${highlight} ${color} ${noHover}`}
        onClick={() => handleClick(i)}
        disabled={!!winner}
        style={{ flex: 1 }}
      >
        {board[i]}
      </button>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningLine([]);
    setXIsNext(true);
  };

  const toggleAI = () => {
    if (isAIMode) {
      setIsAIMode(false);
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4" style={{ background: 'radial-gradient(ellipse at top right, #00a388, #79bd8f, #beeb9f)' }}>
      {!showModal && (
        <div className="relative z-10 bg-white rounded-lg shadow-lg p-8 sm:p-6 w-full sm:w-[320px] flex flex-col items-center">
          <h1 className="text-3xl sm:text-3xl font-bold mb-4 text-center">
  <span className="">🔴</span> Tic-Tac-Toe <span className="">🔵</span>
</h1>
          <div className="grid grid-cols-3 gap-4 w-full max-w-[300px] sm:max-w-[320px]">
            {board.map((_value, index) => <div key={index} className="flex justify-center items-center">{renderSquare(index)}</div>)}
          </div>
          {winner && (
            <div className="mt-4 text-center">
              <p className="text-xl font-bold">Winner: {winner}</p>
            </div>
          )}
          {!winner && board.every((square) => square !== null) && (
            <div className="mt-4 text-center">
              <p className="text-xl font-bold">It's a Draw!</p>
            </div>
          )}
        </div>
      )}
      {!showModal && (
        <div className="flex flex-col sm:flex-row justify-center mt-4 w-full sm:w-[320px] gap-4">
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-lg flex items-center justify-center focus:outline-none focus:shadow-outline"
            onClick={resetGame}
          >
            <RefreshCw className="inline h-6 w-6 mr-2" /> Reset Game
          </button>
          <button
            className={`w-full text-lg ${isAIMode ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'} text-white font-bold py-2 px-4 rounded flex items-center justify-center focus:outline-none focus:shadow-outline`}
            onClick={toggleAI}
          >
            {isAIMode ? 'Disable AI Opponent' : 'Toggle AI Opponent'}
          </button>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-[90%] sm:max-w-sm w-full">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeModal}>
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">Select Difficulty</h2>
            <div className="flex flex-col space-y-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-lg sm:text-xl focus:outline-none focus:shadow-outline"
                onClick={() => { setDifficulty('easy'); setIsAIMode(true); closeModal(); }}>Easy</button>
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded text-lg sm:text-xl focus:outline-none focus:shadow-outline"
                onClick={() => { setDifficulty('medium'); setIsAIMode(true); closeModal(); }}>Medium</button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-lg sm:text-xl focus:outline-none focus:shadow-outline"
                onClick={() => { setDifficulty('hard'); setIsAIMode(true); closeModal(); }}>Hard</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
