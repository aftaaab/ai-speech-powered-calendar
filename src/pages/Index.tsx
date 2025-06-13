
import React, { useState } from 'react';
import { Brain, Calendar, Sparkles, CheckCircle } from 'lucide-react';
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
        title: "Tasks Generated!",
        description: `I've analyzed your speech and created ${mockTasks.length} calendar events based on your routine.`,
      });
    }, 2000);
  };

  const handleAddToCalendar = (task: Task) => {
    console.log('Adding task to calendar:', task);
    toast({
      title: "Event Added",
      description: `"${task.title}" has been prepared for your calendar. Integration setup required to sync.`,
    });
  };

  const handleCalendarSelect = (provider: 'google' | 'apple') => {
    setSelectedCalendar(provider);
    console.log('Selected calendar provider:', provider);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Speechlender
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Speak naturally about your routine, hobbies, and work schedule. 
            I'll intelligently create calendar events and reminders for you.
          </p>
        </div>

        {/* Voice Recording Section */}
        <div className="max-w-md mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <VoiceRecorder 
              onRecordingComplete={handleRecordingComplete}
              isProcessing={isProcessing}
            />
            
            {isProcessing && (
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-2 text-blue-600">
                  <Sparkles className="w-5 h-5 animate-spin" />
                  <span className="font-medium">Analyzing your speech with AI...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Generated Tasks */}
        {tasks.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-2 mb-8">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h2 className="text-2xl font-bold text-gray-900">Generated Calendar Events</h2>
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
        <div className="max-w-md mx-auto">
          <CalendarIntegration onCalendarSelect={handleCalendarSelect} />
        </div>

        {/* Features Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">How It Works</h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Speak Naturally</h4>
              <p className="text-gray-600">Talk about your daily routine, hobbies, work schedule, or any activities you want to organize.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">AI Analysis</h4>
              <p className="text-gray-600">Our AI understands context and extracts meaningful events, times, and priorities from your speech.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Calendar Sync</h4>
              <p className="text-gray-600">Seamlessly add generated events to your Google Calendar or Apple Calendar with one click.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
