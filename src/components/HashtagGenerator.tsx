import React, { useState, useEffect } from 'react';
import { Hash, Search, Copy, CheckCircle, Trash2, Star, History, TrendingUp } from 'lucide-react';

interface HashtagSet {
  id: string;
  tags: string[];
  timestamp: number;
  category: string;
}

const CATEGORY_TAGS: Record<string, string[]> = {
  technology: [
    '#tech', '#coding', '#programming', '#developer', '#software', '#webdev',
    '#javascript', '#react', '#nodejs', '#typescript', '#github', '#opensource',
    '#100daysofcode', '#developerlife', '#codelife'
  ],
  lifestyle: [
    '#lifestyle', '#life', '#motivation', '#inspiration', '#happy', '#love',
    '#mindfulness', '#wellness', '#selfcare', '#positivity', '#growth',
    '#personaldevelopment', '#mindset', '#happiness', '#gratitude'
  ],
  business: [
    '#business', '#entrepreneur', '#success', '#marketing', '#startup',
    '#smallbusiness', '#entrepreneurship', '#businessowner', '#leadership',
    '#innovation', '#branding', '#businesstips', '#entrepreneurlife', '#startup',
    '#businessgrowth'
  ],
  education: [
    '#education', '#learning', '#student', '#study', '#school', '#college',
    '#knowledge', '#teaching', '#onlinelearning', '#edtech', '#studentlife',
    '#learning', '#teacher', '#classroom', '#elearning'
  ],
  entertainment: [
    '#entertainment', '#fun', '#music', '#movie', '#gaming', '#youtube',
    '#streaming', '#twitch', '#gamer', '#contentcreator', '#streamer',
    '#youtuber', '#creator', '#videogames', '#twitchstreamer'
  ],
  creative: [
    '#creative', '#art', '#design', '#artist', '#creativity', '#illustration',
    '#digitalart', '#graphicdesign', '#drawing', '#artwork', '#creative',
    '#designer', '#artistsoninstagram', '#create', '#portfolio'
  ]
};

const TRENDING_TAGS = [
  '#viral', '#trending', '#explore', '#follow', '#share', '#community',
  '#growth', '#engagement', '#socialmedia', '#influence', '#reach'
];

const HashtagGenerator: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('technology');
  const [copied, setCopied] = useState(false);
  const [generatedTags, setGeneratedTags] = useState<string[]>([]);
  const [savedSets, setSavedSets] = useState<HashtagSet[]>(() => {
    const saved = localStorage.getItem('savedHashtagSets');
    return saved ? JSON.parse(saved) : [];
  });
  const [showTrending, setShowTrending] = useState(false);
  const [tagCount, setTagCount] = useState(10);

  useEffect(() => {
    localStorage.setItem('savedHashtagSets', JSON.stringify(savedSets));
  }, [savedSets]);

  const generateHashtags = () => {
    const baseTags = CATEGORY_TAGS[category];
    const trendingSelection = showTrending ? TRENDING_TAGS : [];
    const keywordTags = keyword
      ? keyword
          .toLowerCase()
          .split(/[\s,]+/)
          .filter(word => word.length > 2)
          .map(word => `#${word.replace(/[^\w]/g, '')}`)
      : [];

    const allTags = [...new Set([...keywordTags, ...baseTags, ...trendingSelection])];
    const randomizedTags = allTags
      .sort(() => Math.random() - 0.5)
      .slice(0, tagCount);

    setGeneratedTags(randomizedTags);
  };

  const saveHashtagSet = () => {
    if (generatedTags.length === 0) return;

    const newSet: HashtagSet = {
      id: Date.now().toString(),
      tags: generatedTags,
      timestamp: Date.now(),
      category
    };

    setSavedSets(prev => [newSet, ...prev].slice(0, 10));
  };

  const deleteSavedSet = (id: string) => {
    setSavedSets(prev => prev.filter(set => set.id !== id));
  };

  const loadSavedSet = (set: HashtagSet) => {
    setGeneratedTags(set.tags);
    setCategory(set.category);
  };

  const copyToClipboard = (tags: string[]) => {
    navigator.clipboard.writeText(tags.join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center space-y-4">
        <div className="inline-block p-3 rounded-full bg-indigo-600/20 mb-4">
          <Hash size={32} className="text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradientFlow">
          Hashtag Generator
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Generate relevant hashtags for your content based on keywords, categories, and trends.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter keywords (comma separated)"
                className="w-full pl-12 pr-4 py-4 bg-[#1a1a3a] border border-indigo-900/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-4 bg-[#1a1a3a] border border-indigo-900/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              >
                {Object.keys(CATEGORY_TAGS).map((cat) => (
                  <option key={cat} value={cat} className="capitalize">
                    {cat}
                  </option>
                ))}
              </select>

              <select
                value={tagCount}
                onChange={(e) => setTagCount(Number(e.target.value))}
                className="px-4 py-4 bg-[#1a1a3a] border border-indigo-900/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              >
                {[5, 10, 15, 20, 25, 30].map((num) => (
                  <option key={num} value={num}>
                    {num} hashtags
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-gray-400">
                <input
                  type="checkbox"
                  checked={showTrending}
                  onChange={(e) => setShowTrending(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-700 bg-[#1a1a3a] focus:ring-indigo-500"
                />
                Include trending hashtags
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={generateHashtags}
              className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-medium transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Hash size={20} />
              Generate Hashtags
            </button>

            {generatedTags.length > 0 && (
              <button
                onClick={saveHashtagSet}
                className="px-4 py-4 bg-indigo-600/20 hover:bg-indigo-600/30 rounded-xl transition-all flex items-center justify-center"
                title="Save hashtag set"
              >
                <Star size={20} className="text-indigo-400" />
              </button>
            )}
          </div>

          {generatedTags.length > 0 && (
            <div className="relative">
              <div className="p-4 bg-[#1a1a3a] border border-indigo-900/30 rounded-xl">
                <div className="flex flex-wrap gap-2 mb-4">
                  {generatedTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => copyToClipboard(generatedTags)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 rounded-lg transition-colors text-indigo-400"
                >
                  {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                  {copied ? 'Copied!' : 'Copy All'}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <History size={20} />
            <h2 className="text-lg font-semibold">Saved Sets</h2>
          </div>
          {savedSets.length === 0 ? (
            <p className="text-gray-500 text-sm">No saved hashtag sets yet.</p>
          ) : (
            <div className="space-y-3">
              {savedSets.map((set) => (
                <div
                  key={set.id}
                  className="p-3 bg-[#1a1a3a] border border-indigo-900/30 rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 capitalize">{set.category}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => loadSavedSet(set)}
                        className="p-1 hover:text-indigo-400 transition-colors"
                        title="Load set"
                      >
                        <TrendingUp size={16} />
                      </button>
                      <button
                        onClick={() => deleteSavedSet(set.id)}
                        className="p-1 hover:text-red-400 transition-colors"
                        title="Delete set"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {set.tags.slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 bg-indigo-600/20 text-indigo-400 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {set.tags.length > 5 && (
                      <span className="text-xs px-2 py-0.5 bg-indigo-600/20 text-indigo-400 rounded-full">
                        +{set.tags.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HashtagGenerator;