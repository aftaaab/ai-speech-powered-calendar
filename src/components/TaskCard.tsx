
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
      work: 'bg-blue-100 text-blue-800 border-blue-200',
      personal: 'bg-green-100 text-green-800 border-green-200',
      health: 'bg-red-100 text-red-800 border-red-200',
      hobby: 'bg-purple-100 text-purple-800 border-purple-200',
      other: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
          <Badge className={`${getCategoryColor(task.category)} border`}>
            <Tag className="w-3 h-3 mr-1" />
            {task.category}
          </Badge>
        </div>
        
        <p className="text-gray-600 mb-4 leading-relaxed">{task.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            {task.date}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            {task.time} {task.duration && `(${task.duration})`}
          </div>
          {task.location && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-2" />
              {task.location}
            </div>
          )}
        </div>
        
        <Button 
          onClick={() => onAddToCalendar(task)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
        >
          Add to Calendar
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
