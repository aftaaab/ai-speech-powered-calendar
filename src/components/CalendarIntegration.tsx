
import React, { useState } from 'react';
import { Calendar, ExternalLink, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface CalendarIntegrationProps {
  onCalendarSelect: (provider: 'google' | 'apple') => void;
}

const CalendarIntegration: React.FC<CalendarIntegrationProps> = ({ onCalendarSelect }) => {
  const [connectedCalendars, setConnectedCalendars] = useState<string[]>([]);
  const { toast } = useToast();

  const handleCalendarConnect = (provider: 'google' | 'apple') => {
    // In a real app, this would handle OAuth flow
    toast({
      title: "Calendar Integration",
      description: `${provider === 'google' ? 'Google' : 'Apple'} Calendar integration would be set up here. This requires API keys and OAuth setup.`,
    });
    onCalendarSelect(provider);
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Calendar className="w-5 h-5 text-cyan-400" />
          <span>Calendar Integration</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          <div className="flex items-center justify-between p-4 border border-white/20 rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Calendar className="w-4 h-4 text-blue-300" />
              </div>
              <div>
                <p className="font-medium text-white">Google Calendar</p>
                <p className="text-sm text-gray-400">Sync with your Google account</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleCalendarConnect('google')}
              className="flex items-center space-x-1 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Connect</span>
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-white/20 rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-500/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Calendar className="w-4 h-4 text-gray-300" />
              </div>
              <div>
                <p className="font-medium text-white">Apple Calendar</p>
                <p className="text-sm text-gray-400">Sync with iCloud Calendar</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleCalendarConnect('apple')}
              className="flex items-center space-x-1 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Connect</span>
            </Button>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30 backdrop-blur-sm">
          <div className="flex items-start space-x-2">
            <Settings className="w-4 h-4 text-purple-300 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-white">Setup Required</p>
              <p className="text-xs text-gray-300 mt-1">
                To enable calendar integration, you'll need to set up API credentials for Google Calendar or Apple Calendar in your project settings.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarIntegration;
