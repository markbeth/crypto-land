'use client'
import { useState } from 'react'
import Image from 'next/image'

interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
}

interface NewsResponse {
  success: boolean
  data: {
    news_text: string
    sentiment: string
    executionTime: string
  }
}

const FeatureCard = ({ emoji, title, description }: FeatureCardProps) => (
  <div className="bg-gray-900 p-6 rounded-lg border border-green-400/20 
                  hover:border-green-400/50 transition-all transform hover:scale-105">
    <div className="text-green-400 text-4xl mb-4">{emoji}</div>
    <h3 className="text-xl font-semibold mb-4 text-green-400">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default function Home() {
  const [result, setResult] = useState<NewsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/explore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: 'test' }),
      })
      const data: NewsResponse = await response.json()
      setResult(data)
    } catch (err) {
      console.error('Error:', err)
      setResult({ success: false, data: { news_text: '', sentiment: '', executionTime: '' } })
    } finally {
      setLoading(false)
    }
  }

  const handleDocsClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.open('/api/docs', '_blank')
  }

  const handleSubscribe = async () => {
    setSubscribeStatus('loading')
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Subscription failed')
      }

      setSubscribeStatus('success')
      setEmail('')
      setTimeout(() => setSubscribeStatus('idle'), 3000)
    } catch {
      setSubscribeStatus('error')
    }
  }

  const features = [
    {
      emoji: '🤖',
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze news sentiment in real-time, providing accurate market mood indicators'
    },
    {
      emoji: '📊',
      title: 'Data Aggregation',
      description: 'Continuous scraping and processing of crypto news from thousands of trusted sources worldwide'
    },
    {
      emoji: '📈',
      title: 'Trading Insights',
      description: 'Transform sentiment data into actionable trading signals with our proprietary scoring system'
    }
  ]

  return (
    <main className="min-h-screen bg-gray-900">
      {/* Social Links */}
      <div className="w-full bg-gray-900 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a
            href="/api/docs"
            onClick={handleDocsClick}
            className="bg-green-500 text-gray-900 px-4 py-2 rounded-lg 
                     hover:bg-green-400 transition-all transform hover:scale-105
                     border border-green-400 hover:shadow-[0_0_15px_rgba(74,222,128,0.5)]"
          >
            Docs
          </a>
          <div className="flex gap-4">
            <a
              href="https://twitter.com/your-handle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a
              href="https://github.com/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-green-400 mb-6 tracking-tight glowing-text">
              CryptoSentinel AI
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Harness the power of AI-driven sentiment analysis for smarter crypto trading. 
              We analyze thousands of news sources in real-time to give you the edge.
            </p>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="w-full">
        <div className="container mx-auto px-4">
          <Image 
            src="/banner.webp" 
            alt="Crypto Analysis Banner" 
            className="w-full max-w-4xl h-auto rounded-lg shadow-lg mx-auto"
            width={1920}
            height={1080}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-400">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <button 
              onClick={handleSubmit}
              className="bg-green-500 text-gray-900 px-8 py-3 rounded-lg 
                       hover:bg-green-400 transition-all transform hover:scale-105
                       border border-green-400 hover:shadow-[0_0_15px_rgba(74,222,128,0.5)]"
            >
              {loading ? 'Processing...' : 'Explore the Algorithm'}
            </button>
          </div>

          {/* Results Section */}
          {(loading || result) && (
            <div className="mt-8">
              {loading && (
                <div className="text-center text-green-400">
                  <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}

              {result && result.success && (
                <div className="bg-gray-800 rounded-lg p-6 border border-green-400/20">
                  <h3 className="text-xl font-bold text-green-400 mb-4">Analysis Results Example</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                      <thead>
                        <tr className="border-b border-green-400/20">
                          <th className="px-4 py-2 text-left text-green-400">Field</th>
                          <th className="px-4 py-2 text-left text-green-400">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(result.data).map(([key, value], index) => (
                          <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/50">
                            <td className="px-4 py-2 text-gray-400 font-medium">{key}</td>
                            <td className="px-4 py-2 text-gray-300">
                              {typeof value === 'object' 
                                ? JSON.stringify(value, null, 2)
                                : String(value)
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-green-400">
              Stay Updated
            </h2>
            <p className="text-gray-300 mb-8">
              Subscribe to our newsletter for the latest crypto insights and AI analysis updates.
            </p>
            
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-900 border border-green-400/20 
                           text-gray-100 placeholder-gray-400 focus:outline-none focus:border-green-400
                           focus:ring-1 focus:ring-green-400"
                />
                <button
                  type="submit"
                  disabled={subscribeStatus === 'loading'}
                  className="px-6 py-2 bg-green-500 text-gray-900 rounded-lg 
                           hover:bg-green-400 transition-all transform hover:scale-105
                           border border-green-400 hover:shadow-[0_0_15px_rgba(74,222,128,0.5)]
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {subscribeStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              
              {/* Статус подписки */}
              {subscribeStatus === 'success' && (
                <p className="mt-2 text-green-400">Thanks for subscribing!</p>
              )}
              {subscribeStatus === 'error' && (
                <p className="mt-2 text-red-400">Subscription failed. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}