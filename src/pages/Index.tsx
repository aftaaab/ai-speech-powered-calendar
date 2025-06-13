
import React, { useState } from 'react';
import { Brain, Calendar, Sparkles, CheckCircle, Zap, Heart } from 'lucide-react';
import VoiceRecorder from '@/components/VoiceRecorder';
import TaskCard from '@/components/TaskCard';
import CalendarIntegration from '@/components/CalendarIntegration';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration?: string;
  location?: string;
  category: 'work' | 'personal' | 'health' | 'hobby' | 'other';
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState<'google' | 'apple' | null>(null);
  const { toast } = useToast();

  const handleRecordingComplete = async (audioBlob: Blob) => {
    setIsProcessing(true);
    console.log('Audio recording completed, size:', audioBlob.size);
    
    // Simulate AI processing with mock data
    setTimeout(() => {
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Morning Workout',
          description: 'Go for a 30-minute jog in the park as part of my fitness routine',
          date: 'Tomorrow',
          time: '7:00 AM',
          duration: '30 minutes',
          location: 'Central Park',
          category: 'health'
        },
        {
          id: '2',
          title: 'Team Meeting',
          description: 'Weekly team sync to discuss project progress and upcoming deadlines',
          date: 'Monday',
          time: '10:00 AM',
          duration: '1 hour',
          location: 'Conference Room A',
          category: 'work'
        },
        {
          id: '3',
          title: 'Guitar Practice',
          description: 'Practice new songs and work on fingerpicking techniques',
          date: 'Wednesday',
          time: '6:00 PM',
          duration: '45 minutes',
          category: 'hobby'
        }
      ];
      
      setTasks(mockTasks);
      setIsProcessing(false);
      
      toast({
        title: "Tasks Generated! ✨",
        description: `I've analyzed your speech and created ${mockTasks.length} calendar events based on your routine.`,
      });
    }, 2000);
  };

  const handleAddToCalendar = (task: Task) => {
    console.log('Adding task to calendar:', task);
    toast({
      title: "Event Added 🎉",
      description: `"${task.title}" has been prepared for your calendar. Integration setup required to sync.`,
    });
  };

  const handleCalendarSelect = (provider: 'google' | 'apple') => {
    setSelectedCalendar(provider);
    console.log('Selected calendar provider:', provider);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-cyan-50 to-pink-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 animate-pulse">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-display">
              Speechlender
            </h1>
          </div>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-violet-100 to-pink-100 px-4 py-2 rounded-full mb-4 border border-violet-200/50">
            <Zap className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-semibold text-violet-700">AI-Powered Calendar Magic</span>
            <Heart className="w-4 h-4 text-pink-500" />
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
            Just <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent font-bold">speak naturally</span> about your routine, hobbies, and work schedule. 
            I'll intelligently create calendar events and reminders for you! ✨
          </p>
        </div>

        {/* Voice Recording Section */}
        <div className="max-w-md mx-auto mb-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-pink-500/5"></div>
            <div className="relative z-10">
              <VoiceRecorder 
                onRecordingComplete={handleRecordingComplete}
                isProcessing={isProcessing}
              />
              
              {isProcessing && (
                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center space-x-2 text-violet-600">
                    <Sparkles className="w-5 h-5 animate-spin" />
                    <span className="font-bold">Analyzing your speech with AI magic...</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">This might take a moment ⏳</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Generated Tasks */}
        {tasks.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl font-black text-gray-900">Generated Calendar Events</h2>
              <div className="text-2xl">🎉</div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {tasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onAddToCalendar={handleAddToCalendar}
                />
              ))}
            </div>
          </div>
        )}

        {/* Calendar Integration */}
        <div className="max-w-md mx-auto mb-12">
          <CalendarIntegration onCalendarSelect={handleCalendarSelect} />
        </div>

        {/* Features Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-3xl font-black text-center mb-12 text-gray-900">How The Magic Works ✨</h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center p-8 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-gray-900">Speak Your Mind 🗣️</h4>
              <p className="text-gray-700 leading-relaxed">Talk about your daily routine, hobbies, work schedule, or any activities you want to organize. No scripts needed!</p>
            </div>
            
            <div className="text-center p-8 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-gray-900">AI Does the Work 🤖</h4>
              <p className="text-gray-700 leading-relaxed">Our smart AI understands context and extracts meaningful events, times, and priorities from your natural speech.</p>
            </div>
            
            <div className="text-center p-8 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/25">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-gray-900">Instant Calendar Sync 📅</h4>
              <p className="text-gray-700 leading-relaxed">Seamlessly add generated events to your Google Calendar or Apple Calendar with just one click. Easy peasy!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
