import { NextResponse } from 'next/server';

// Move documentation to a separate constant
const API_DOCUMENTATION = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            color: #ffffff;
            background-color: #1a1a1a;
        }
        h1 {
            color: #4ade80;
            border-bottom: 2px solid #333;
            padding-bottom: 0.5rem;
        }
        h2 {
            color: #ffffff;
            margin-top: 2rem;
        }
        .endpoint {
            background-color: #262626;
            border: 1px solid #333;
            border-radius: 6px;
            padding: 1.5rem;
            margin: 1rem 0;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }
        .method {
            background-color: #4ade80;
            color: #1a1a1a;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-weight: bold;
        }
        .path {
            color: #4ade80;
            font-family: monospace;
            font-size: 1.1em;
            margin-left: 0.5rem;
        }
        .response-code {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-family: monospace;
        }
        .response-200 { background-color: #4ade80; color: #1a1a1a; }
        .response-400 { background-color: #ef4444; color: white; }
        .response-429 { background-color: #f59e0b; color: #1a1a1a; }
        strong {
            color: #4ade80;
        }
    </style>
</head>
<body>
    <h1>CryptoSentinel API Documentation v1.0.0</h1>
    <p>API for cryptocurrency market analysis using AI</p>

    <h2>Available Endpoints</h2>
    <div class="endpoint">
        <p><span class="method">POST</span> <span class="path">/api/market/analysis</span></p>
        <p>Performs AI analysis of the current crypto market situation</p>

        <h3>Required parameters:</h3>
        <ul>
            <li><strong>cryptocurrency:</strong> Cryptocurrency ticker (e.g., BTC, ETH)</li>
            <li><strong>timeframe:</strong> Analysis timeframe (1h, 4h, 1d)</li>
        </ul>

        <h3>Responses:</h3>
        <ul>
            <li><span class="response-code response-200">200</span> Successful analysis with sentiment, confidence, and detailed analysis</li>
            <li><span class="response-code response-400">400</span> Invalid request parameters</li>
            <li><span class="response-code response-429">429</span> Rate limit exceeded</li>
        </ul>
    </div>
</body>
</html>
`;

// Delete any previous exports and only keep this one
export { GET };

async function GET() {
  return new NextResponse(API_DOCUMENTATION, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}