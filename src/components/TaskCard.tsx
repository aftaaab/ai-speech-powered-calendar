
import React from 'react';
import { Calendar, Clock, Tag, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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

interface TaskCardProps {
  task: Task;
  onAddToCalendar: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onAddToCalendar }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      work: 'bg-blue-500/30 text-blue-200 border-blue-400/50',
      personal: 'bg-green-500/30 text-green-200 border-green-400/50',
      health: 'bg-red-500/30 text-red-200 border-red-400/50',
      hobby: 'bg-purple-500/30 text-purple-200 border-purple-400/50',
      other: 'bg-gray-500/30 text-gray-200 border-gray-400/50'
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-slate-800/40 backdrop-blur-xl shadow-lg hover:scale-105 border border-slate-700/30">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-white">{task.title}</h3>
          <Badge className={`${getCategoryColor(task.category)} border backdrop-blur-sm`}>
            <Tag className="w-3 h-3 mr-1" />
            {task.category}
          </Badge>
        </div>
        
        <p className="text-gray-300 mb-4 leading-relaxed">{task.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-300">
            <Calendar className="w-4 h-4 mr-2 text-blue-400" />
            {task.date}
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <Clock className="w-4 h-4 mr-2 text-green-400" />
            {task.time} {task.duration && `(${task.duration})`}
          </div>
          {task.location && (
            <div className="flex items-center text-sm text-gray-300">
              <MapPin className="w-4 h-4 mr-2 text-pink-400" />
              {task.location}
            </div>
          )}
        </div>
        
        <Button 
          onClick={() => onAddToCalendar(task)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-white border-0 shadow-lg hover:shadow-xl"
        >
          Add to Calendar
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
