import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Plus, Edit2, Trash2, Volume2, Settings, ChevronDown, Github, Star, Heart, MessageCircle, ExternalLink } from 'lucide-react';

interface TextContent {
  id: string;
  title: string;
  text: string;
}

interface SpeechSettings {
  rate: number;
  pitch: number;
  volume: number;
  voice: SpeechSynthesisVoice | null;
}

function App() {
  const [textContents, setTextContents] = useState<TextContent[]>([
    {
      id: '1',
      title: 'Welcome Message',
      text: 'Welcome to our advanced text-to-speech application. This modern interface allows you to create, manage, and listen to your text content with beautiful voice synthesis and real-time highlighting.'
    },
    {
      id: '2',
      title: 'Sample Article',
      text: 'Technology continues to evolve at an unprecedented pace. From artificial intelligence to quantum computing, we are witnessing innovations that will reshape our world. The ability to convert text to natural-sounding speech is just one example of how technology enhances accessibility and user experience.'
    }
  ]);

  const [selectedContent, setSelectedContent] = useState<TextContent | null>(textContents[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editingContent, setEditingContent] = useState<string | null>(null);
  const [showGitHubPrompt, setShowGitHubPrompt] = useState(true);
  
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speechSettings, setSpeechSettings] = useState<SpeechSettings>({
    rate: 1,
    pitch: 1,
    volume: 1,
    voice: null
  });

  const [newContent, setNewContent] = useState({ title: '', text: '' });
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const wordsRef = useRef<string[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !speechSettings.voice) {
        setSpeechSettings(prev => ({ ...prev, voice: availableVoices[0] }));
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  const handlePlay = () => {
    if (!selectedContent) return;

    if (isPaused) {
      speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(selectedContent.text);
    utterance.rate = speechSettings.rate;
    utterance.pitch = speechSettings.pitch;
    utterance.volume = speechSettings.volume;
    if (speechSettings.voice) {
      utterance.voice = speechSettings.voice;
    }

    wordsRef.current = selectedContent.text.split(' ');
    let wordIndex = 0;

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        setCurrentWordIndex(wordIndex);
        wordIndex++;
      }
    };

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setCurrentWordIndex(0);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentWordIndex(-1);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentWordIndex(-1);
    };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentWordIndex(-1);
  };

  const addContent = () => {
    if (newContent.title.trim() && newContent.text.trim()) {
      const content: TextContent = {
        id: Date.now().toString(),
        title: newContent.title,
        text: newContent.text
      };
      setTextContents([...textContents, content]);
      setNewContent({ title: '', text: '' });
      setShowAddForm(false);
    }
  };

  const deleteContent = (id: string) => {
    setTextContents(textContents.filter(content => content.id !== id));
    if (selectedContent?.id === id) {
      setSelectedContent(textContents.find(content => content.id !== id) || null);
    }
  };

  const renderHighlightedText = () => {
    if (!selectedContent) return null;

    const words = selectedContent.text.split(' ');
    return (
      <div className="text-lg leading-relaxed">
        {words.map((word, index) => (
          <span
            key={index}
            className={`${
              index === currentWordIndex
                ? 'bg-blue-500 text-white px-1 rounded animate-pulse'
                : 'text-gray-300'
            } transition-all duration-200`}
          >
            {word}{' '}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Volume2 className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              VoiceFlow
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <a
              href="https://github.com/yuis-ice/text-to-speech"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group"
              title="View on GitHub"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Text</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Content List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-200">Text Library</h2>
            <div className="space-y-3">
              {textContents.map((content) => (
                <div
                  key={content.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:border-blue-500 ${
                    selectedContent?.id === content.id
                      ? 'bg-blue-900/30 border-blue-500'
                      : 'bg-gray-800 border-gray-700'
                  }`}
                  onClick={() => setSelectedContent(content)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-200">{content.title}</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingContent(content.id);
                        }}
                        className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteContent(content.id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                    {content.text.substring(0, 100)}...
                  </p>
                </div>
              ))}
            </div>
            
            {/* GitHub Engagement Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center space-x-2 mb-3">
                <Github className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-gray-200">Open Source</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Help improve VoiceFlow by contributing to our open source project!
              </p>
              <div className="space-y-2">
                <a
                  href="https://github.com/yuis-ice/text-to-speech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full p-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors group"
                >
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>Star Repository</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://github.com/yuis-ice/text-to-speech/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full p-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors group"
                >
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-green-400" />
                    <span>Report Issues</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://github.com/yuis-ice/text-to-speech/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full p-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors group"
                >
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span>Contribute</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Controls */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-200">
                  {selectedContent?.title || 'Select a text to begin'}
                </h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handlePlay}
                    disabled={!selectedContent || (isPlaying && !isPaused)}
                    className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    <Play className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handlePause}
                    disabled={!isPlaying}
                    className="p-3 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    <Pause className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleStop}
                    disabled={!isPlaying && !isPaused}
                    className="p-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    <Square className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Text Display */}
              <div className="bg-gray-900 rounded-lg p-6 min-h-[300px] max-h-[500px] overflow-y-auto">
                {selectedContent ? renderHighlightedText() : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Select a text from the library to start
                  </div>
                )}
              </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Voice Settings</h3>
                
                {/* Voice Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Voice</label>
                  <div className="relative">
                    <select
                      value={speechSettings.voice?.name || ''}
                      onChange={(e) => {
                        const voice = voices.find(v => v.name === e.target.value) || null;
                        setSpeechSettings(prev => ({ ...prev, voice }));
                      }}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white appearance-none"
                    >
                      {voices.map((voice) => (
                        <option key={voice.name} value={voice.name}>
                          {voice.name} ({voice.lang})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Rate Control */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Speed: {speechSettings.rate.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={speechSettings.rate}
                    onChange={(e) => setSpeechSettings(prev => ({ ...prev, rate: parseFloat(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                {/* Pitch Control */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Pitch: {speechSettings.pitch.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={speechSettings.pitch}
                    onChange={(e) => setSpeechSettings(prev => ({ ...prev, pitch: parseFloat(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                {/* Volume Control */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Volume: {Math.round(speechSettings.volume * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={speechSettings.volume}
                    onChange={(e) => setSpeechSettings(prev => ({ ...prev, volume: parseFloat(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* GitHub Promotion Banner */}
        {showGitHubPrompt && (
          <div className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 shadow-lg max-w-sm z-40 border border-blue-500/30">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Github className="w-5 h-5 text-white" />
                <span className="font-semibold text-white">Open Source Project</span>
              </div>
              <button
                onClick={() => setShowGitHubPrompt(false)}
                className="text-white/80 hover:text-white transition-colors text-xl leading-none"
              >
                ×
              </button>
            </div>
            <p className="text-white/90 text-sm mb-4">
              VoiceFlow is open source! Help us improve by starring the repo, reporting issues, or contributing code.
            </p>
            <div className="flex space-x-2">
              <a
                href="https://github.com/yuis-ice/text-to-speech"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded text-sm transition-colors"
              >
                <Star className="w-4 h-4" />
                <span>Star</span>
              </a>
              <a
                href="https://github.com/yuis-ice/text-to-speech/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Issues</span>
              </a>
            </div>
          </div>
        )}

        {/* Add Content Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
              <h3 className="text-xl font-semibold mb-4">Add New Text</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={newContent.title}
                    onChange={(e) => setNewContent(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    placeholder="Enter a title for your text"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Text Content</label>
                  <textarea
                    value={newContent.text}
                    onChange={(e) => setNewContent(prev => ({ ...prev, text: e.target.value }))}
                    rows={8}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white resize-none"
                    placeholder="Enter the text you want to convert to speech"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addContent}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Add Text
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 border-t border-gray-700 pt-8 pb-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>© 2024 VoiceFlow</span>
              <span>•</span>
              <span>Open Source MIT License</span>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/yuis-ice/text-to-speech"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View Source</span>
              </a>
              <span className="text-gray-600">•</span>
              <a
                href="https://github.com/yuis-ice/text-to-speech/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Feedback</span>
              </a>
              <span className="text-gray-600">•</span>
              <a
                href="https://github.com/sponsors/yuis-ice"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-gray-400 hover:text-pink-400 transition-colors"
              >
                <Heart className="w-4 h-4" />
                <span>Sponsor</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;