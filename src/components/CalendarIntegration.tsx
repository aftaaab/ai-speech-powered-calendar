
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
    <Card className="border-0 bg-gradient-to-br from-white to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span>Calendar Integration</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Google Calendar</p>
                <p className="text-sm text-gray-500">Sync with your Google account</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleCalendarConnect('google')}
              className="flex items-center space-x-1"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Connect</span>
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <p className="font-medium">Apple Calendar</p>
                <p className="text-sm text-gray-500">Sync with iCloud Calendar</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleCalendarConnect('apple')}
              className="flex items-center space-x-1"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Connect</span>
            </Button>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-2">
            <Settings className="w-4 h-4 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Setup Required</p>
              <p className="text-xs text-blue-700 mt-1">
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
