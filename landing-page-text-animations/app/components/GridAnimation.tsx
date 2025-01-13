"use client"
import { useTrail, useChain, useSprings, animated, useSpringRef } from '@react-spring/web';
import { useEffect, useState, memo } from 'react';

// Split coordinates into logo and text parts
const LOGO_COORDS = [
    // exa logo 
    [1, 1], 
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 7],
    [1, 8],
    [1, 9],
    [1, 10],
    [1, 11],

    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1], 
    [6, 1],
    [7, 1],
    [8, 1],

    [2, 2],
    [3, 3],
    [3, 4],
    [4, 5],

    [2, 6],
    [3, 6],
    [4, 6],
    [5, 6],
    [5, 7],
    [6, 8],
    [6, 9],
    [7, 10],

    [2, 11],
    [3, 11],
    [4, 11],
    [5, 11], 
    [6, 11],
    [7, 11],
    [8, 11],

    [2, 10],
    [3, 9],
    [3, 8],
    [4, 7],
    [5, 5],
    [6, 4],
    [6, 3],
    [7, 2],
];

const TEXT_COORDS = [
    // e
    [8, 6],
    [9, 6],
    [10, 6],
    [8, 5],
    [9, 4],
    [10, 5],
    [8, 7],
    [9, 8],
    [10, 8],

    // x
    [12, 4],
    [12, 5],
    [13, 5],
    [13, 6], 
    [14, 7], 
    [14, 8],
    [12, 7],
    [12, 8],
    [14, 4],

    // a
    [16, 4],
    [16, 5],
    [16, 6], 
    [16, 7],
    [17, 4],
    [17, 8],
    [18, 4],
    [18, 5],
    [18, 6],
    [18, 7],
    [18, 8],
    [19, 8],
];

const STROKE_WIDTH = 0.5;
const OFFSET = STROKE_WIDTH / 2;
const MAX_WIDTH = 200 + OFFSET * 2;
const MAX_HEIGHT = 130 + OFFSET * 2;
const CELL_SIZE = 10;

const GridAnimation = memo(() => {
  const [key, setKey] = useState(0);
  const gridApi = useSpringRef();
  const boxApi = useSpringRef();
  const gridFadeApi = useSpringRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setKey(prev => prev + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const gridSprings = useTrail(21, {
    ref: gridApi,
    from: { x2: 0, y2: 0 },
    to: { x2: MAX_WIDTH, y2: MAX_HEIGHT },
    reset: true,
    key: key,
  });

  const gridFade = useTrail(21, {
    ref: gridFadeApi,
    from: { opacity: 1 },
    to: { opacity: 0 },
    config: { duration: 500 },
    reset: true,
    key: key,
  });

  // Separate springs for logo and text
  const logoSprings = useSprings(LOGO_COORDS.length, LOGO_COORDS.map((_, i) => ({
    ref: boxApi,
    from: { opacity: 0, scale: 0 },
    to: { opacity: 1, scale: 1 },
    delay: i * 100,
    config: { mass: 1, tension: 280, friction: 20 },
    reset: true,
    key: key,
  })));

  const textSprings = useSprings(TEXT_COORDS.length, TEXT_COORDS.map((_, i) => ({
    ref: boxApi,
    from: { opacity: 0, scale: 0 },
    to: { opacity: 1, scale: 1 },
    delay: (i + LOGO_COORDS.length) * 100, // Continue delay sequence after logo
    config: { mass: 1, tension: 280, friction: 20 },
    reset: true,
    key: key,
  })));

  useChain([gridApi, boxApi, gridFadeApi], [0, 0.3, 0.6], 2000);

  return (
    <div className="w-full h-full bg-blue-700 text-white flex items-center justify-center">
      <div className="max-w-3xl w-1/2 mx-auto">
        <svg viewBox={`0 0 ${MAX_WIDTH} ${MAX_HEIGHT}`}>
          <g>
            {gridSprings.map(({ x2 }, index) => (
              <animated.line
                x1={0}
                y1={index * CELL_SIZE + OFFSET}
                x2={x2}
                y2={index * CELL_SIZE + OFFSET}
                key={`h-${index}-${key}`}
                strokeWidth={STROKE_WIDTH}
                stroke="currentColor"
                style={gridFade[index]}
              />
            ))}
            {gridSprings.map(({ y2 }, index) => (
              <animated.line
                x1={index * CELL_SIZE + OFFSET}
                y1={0}
                x2={index * CELL_SIZE + OFFSET}
                y2={y2}
                key={`v-${index}-${key}`}
                strokeWidth={STROKE_WIDTH}
                stroke="currentColor"
                style={gridFade[index]}
              />
            ))}
          </g>
          <g>
            {/* Logo squares in black */}
            {logoSprings.map(({ scale, opacity }, index) => (
              <animated.rect
                key={`logo-${index}-${key}`}
                width={CELL_SIZE}
                height={CELL_SIZE}
                x={LOGO_COORDS[index][0] * CELL_SIZE}
                y={LOGO_COORDS[index][1] * CELL_SIZE}
                fill="black"
                style={{
                  opacity,
                  transformOrigin: '50% 50%',
                  transform: scale.to(s => `scale(${s})`)
                }}
              />
            ))}
            {/* Text squares in white */}
            {textSprings.map(({ scale, opacity }, index) => (
              <animated.rect
                key={`text-${index}-${key}`}
                width={CELL_SIZE}
                height={CELL_SIZE}
                x={TEXT_COORDS[index][0] * CELL_SIZE}
                y={TEXT_COORDS[index][1] * CELL_SIZE}
                fill="white"
                style={{
                  opacity,
                  transformOrigin: '50% 50%',
                  transform: scale.to(s => `scale(${s})`)
                }}
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
});

GridAnimation.displayName = 'GridAnimation';

export default GridAnimation;