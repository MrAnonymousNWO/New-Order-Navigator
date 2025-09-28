/**
 * @fileOverview A utility to generate an SVG data URI from an emoji.
 * This is used for creating dynamic social media sharing images.
 */

// Function to convert a string to a Base64 string, compatible with browser and server
const toBase64 =
  typeof window === 'undefined'
    ? (str: string) => Buffer.from(str).toString('base64')
    : (str: string) => window.btoa(str);

/**
 * Generates a Data URI for an SVG image containing a centered emoji.
 * @param emoji - The emoji character to render in the image.
 * @returns A string representing the SVG data URI (e.g., "data:image/svg+xml;base64,...").
 */
export function generateSocialImage(emoji: string): string {
  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:hsl(288, 84%, 30%)" />
          <stop offset="100%" style="stop-color:hsl(0, 0%, 13.3%)" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-gradient)" />
      <text
        x="50%"
        y="50%"
        dominant-baseline="central"
        text-anchor="middle"
        font-size="400"
        font-family="sans-serif"
      >
        ${emoji}
      </text>
    </svg>
  `;

  const base64Svg = toBase64(svg.trim());
  return `data:image/svg+xml;base64,${base64Svg}`;
}
